import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { BrowserRouter as Redirect, Router, Route, NavLink, Switch } from 'react-router-dom'
import firebase from 'firebase/app';

// components
import Maintenance from './components/Maintenance';
import Chores from './components/Chores';
import RequestForm from './components/RequestForm';
import Overview from './components/Overview';
import About from './components/About';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Todo from './components/Todo';
import CollectedPayment from './components/CollectedPayment';
import SubmitCollectPayment from './components/SubmitCollectPayment';
import SignUpForm from './components/SignUpForm';
import ChoresDashboard from './components/ChoresDashboard';
import Chart from './components/Chart';
import RentBreakdown from './components/RentBreakdown';
import PaymentStatus from './components/PaymentStatus';
import Calendar from './components/Calendar';
import Cover from './components/Cover';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      payments: [],
      requests: [],
      chores: [],
      tenants: []
    };
  }

  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({loading: false})
  //   }, 1500);
  // }

  componentDidMount() {
    this.authUnSubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){ 
        this.currentUserData = firebase.database().ref('users/' + firebaseUser.uid);
        this.currentUserData.on('value', (snapshot1) => {
          if (snapshot1.val().role === 'tenant') {
            let associatedAccount = snapshot1.val().associatedAccount;
            this.associatedData = firebase.database().ref('users/' + associatedAccount);
            this.associatedData.on('value', (snapshot2) => {
              let payments = snapshot2.val().payments;
              let requests = snapshot1.val().requests;
              let chores = snapshot1.val().chores;
              if (payments === undefined) {
                payments = [];
              } 
              if (requests === undefined) {
                requests = [];
              } 
              if (chores === undefined) {
                chores = [];
              } 
              this.setState({setup: snapshot1.val().setup, 
                role: snapshot1.val().role,
                tenants: snapshot1.val().tenants,
                requests,
                avatar: firebaseUser.photoURL,
                payments,
                chores,
                user: firebaseUser, 
                associatedAccount,
                loading: false});
            }).bind(this);
          } else {
            let payments = snapshot1.val().payments;
            let requests = snapshot1.val().requests;
            let tenants = snapshot1.val().tenants;
            if (payments === undefined) {
              payments = [];
            }
            if (requests === undefined) {
              requests = [];
            } 
            if (tenants === undefined) {
              tenants = [];
            } 
            this.setState({setup: snapshot1.val().setup, 
              role: snapshot1.val().role,
              tenants,
              payments,
              requests,
              avatar: firebaseUser.photoURL,
              associatedAccount: snapshot1.val().associatedAccount,
              user: firebaseUser, 
              loading: false});
          } 
        })
        // this.setState({user: firebaseUser, loading: false})
      } else { 
        this.setState({user: null, loading: false})
      }
    })
  }

  componentWillUnmount() {
    this.authUnSubFunction() //stop listening for auth changes
    this.currentUserData.off();
    this.associatedData.off();
    this.usersRef.off();
  }

  updateTenants = (tenants, address) => {
    firebase.database().ref('users/' + this.state.user.uid).update({setup:false, address});
    if (this.state.role === 'landlord') {
      this.usersRef = firebase.database().ref('users/');
      this.usersRef.on('value', (snapshot) => {
        let userIds = Object.keys(snapshot.val());
        for (let i = 0; i < userIds.length; i++) {
          let currentId = userIds[i];
          firebase.database().ref('users/' + currentId).on('value', (snapshot) => {
            if (this.state.user.uid !== currentId && snapshot.val().address === address) {
                firebase.database().ref('users/' + currentId).update({associatedAccount: this.state.user.uid});
                firebase.database().ref('users/' + this.state.user.uid).update({associatedAccount: currentId});
                firebase.database().ref('users/' + this.state.user.uid).update({tenants: snapshot.val().tenants});
            }
          }).bind(this);
        }
      })
    }
    firebase.database().ref('users/' + this.state.user.uid).update({tenants});
    // let data = firebase.database().ref('users/' + this.state.user.uid);
    // data.on('value', (snapshot) => {
    //   let tenantKeys = Object.keys(snapshot.val());
    //   this.setState({tenants: snapshot.val()[tenantKeys[0]].tenants, setup: false});
    // })
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle, avatar, role) => {
    this.setState({errorMessage:null, loading: true}); //clear any old errors

    /* TODO: sign up user here */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let firebaseUser = userCredential.user;
        this.userRef = firebase.database().ref('users/' + firebaseUser.uid).set({
          role,
          setup: true,
          address: "",
          associatedAccount: "",
          tenants: [],
          payments: [],
          requests: [],
          chores: []
        });

        this.setState({setup: true, role, avatar});

        let updatePromise = firebaseUser.updateProfile({
          displayName: handle,
          photoURL: avatar
        })

        return updatePromise;
      }).then(() => {
        //after profile is updated
        //update the state //come back to in a second
        this.setState((state) => {
          let user = {...state.user}
          return {user: user}
        })
      })
      .catch((err) => {
        this.setState({errorMessage: err.message})
      })
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({errorMessage:null, loading: true}); //clear any old errors

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((err) => {
      this.setState({errorMessage: err.message})
    })
  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signOut()
    .catch((err) => {
      this.setState({errorMessage: err.message})
    })
  }

  handlePaymentSubmit = (type, amount, due, status, priority) => {
    let payments = this.state.payments;
    payments.push({
      type,
      amount,
      due,
      status
    });
    firebase.database().ref('users/' + this.state.user.uid).update({
      payments: payments
    })
    this.setState({payments});
  }

  handleRentPaid = () => {
    let tenants = this.state.tenants;
    for (let i = 0; i < tenants.length; i++) {
      if (tenants[i].name === this.state.user.displayName) {
        tenants[i].statusRent = 'PAID';
        break;
      }
    }
    this.setState({tenants});
    firebase.database().ref('users/' + this.state.user.uid).update({tenants});
    firebase.database().ref('users/' + this.state.associatedAccount).update({tenants});
  }

  handleUtilitiesPaid = () => {
    let tenants = this.state.tenants;
    for (let i = 0; i < tenants.length; i++) {
      if (tenants[i].name === this.state.user.displayName) {
        tenants[i].statusUtilities = 'PAID';
        break;
      }
    }
    this.setState({tenants});
    firebase.database().ref('users/' + this.state.user.uid).update({tenants});
    firebase.database().ref('users/' + this.state.associatedAccount).update({tenants});
  }
  
  handleRequestSubmit = (unit, type, description, note, img, priority) => {
    let request = {unit, type, description, note, img: img, priority};
    let temp = this.state.requests;
    temp.push(request);
    this.setState({requests: temp});
    firebase.database().ref('users/' + this.state.user.uid).update({requests: temp});
    firebase.database().ref('users/' + this.state.associatedAccount).update({requests: temp});
  }

  handleChores = (chores) => {
    this.setState({chores});
    firebase.database().ref('users/' + this.state.user.uid).update({chores});
  }

  render() {
    let content = null;
    if (!this.state.user) {
      content = (
        <SignUpForm signUpCallback={this.handleSignUp} 
                    signInCallback={this.handleSignIn} />
      );
    } else if (this.state.setup) {
      content = (
        <RentBreakdown updateTenants={this.updateTenants} role={this.state.role}/>
      );
    } else if (!this.state.setup) {
      content = (
        <div>
          <Main handleSignOut={this.handleSignOut} setChores={this.handleChores} chores={this.state.chores} tenants={this.state.tenants} handlePaymentSubmit={this.handlePaymentSubmit}
                payments={this.state.payments} avatar={this.state.avatar} role={this.state.role} displayName={this.state.user.displayName} handleRentPaid={this.handleRentPaid}
                handleUtilitiesPaid={this.handleUtilitiesPaid} handleRequestSubmit={this.handleRequestSubmit} requests={this.state.requests} />
          <Footer />
        </div>
      );
    }
    return (
        <div id="main-container">
          {/* {
            this.state.loading && 
              <Preloader />
          }
          {
            !this.state.loading && 
              <Main handleRequestSubmit={this.handleRequestSubmit}/>
          }
           */}
           {this.state.loading &&
              <Preloader />
            }
            {/* {!this.state.loading && this.state.errorMessage &&
              <p className="alert alert-danger">{this.state.errorMessage}</p>
            } */}
            {!this.state.loading && content}
        </div>
    );
  }
}

// For Hamburger Menu -- Mobile Mode
const HamburgerButton = props => (
  <span className="toggle-button" onClick={props.click}>&#9776; &ensp; Housely</span>
);
const Toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <HamburgerButton click={props.drawerClickHandler} />
      </div>
    </nav>
  </header>
);
const SideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <NavLink exact to='/' onClick={props.hide} activeClassName="current-section" className="nav-section dashboard">
              <div className="left-block"></div>
              <h2>Dashboard</h2>
              <img src="img/arrow.png" alt="Detail Arrow" />
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/request' onClick={props.hide} activeClassName="current-section" className="nav-section request-tab">
              <div className="left-block"></div>
              <h2>Submit Requests</h2>
              <img src="img/arrow.png" alt="Detail Arrow" />
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/chores' onClick={props.hide} activeClassName="current-section" className="nav-section chores-tab">
            <div className="left-block"></div>
            <h2>Chores</h2>
            <img src="img/arrow.png" alt="Detail Arrow" />
          </NavLink>
        </li>
        <li>
          <NavLink to='/collect-payment' onClick={props.hide} activeClassName="current-section" className="nav-section collect-tab">
              <div className="left-block"></div>
              <h2>Collect Payment</h2>
              <img src="img/arrow.png" alt="Detail Arrow" />
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' onClick={props.hide} activeClassName="current-section" className="nav-section">
              <div className="left-block"></div>
              <h2>About</h2>
              <img src="img/arrow.png" alt="Detail Arrow" />
          </NavLink>
        </li>
        <li>
          <a onClick={()=> {
            props.handleSignOut()
            props.hide()
            }} className="sign-out nav-section">
              <div className="left-block"></div>
              <h2>Sign Out</h2>
              <img src="img/arrow.png" alt="Detail Arrow" />
          </a>
        </li>
      </ul>
    </nav>
  );
};
const Backdrop = props => (
  <div className="shadow" onClick={props.click} />
);

// Main container for site
// Stores tenant list state
// Contains router paths
class Main extends Component {
  constructor(props) {
    super(props);
    // deleted hard coded tenants 
    this.state = {
      tenants: []
    };
  }

  updateTenants = (tenants) => {
    this.setState({ tenants });
  }

  // For Mobile Site
  hamburgerShow = () => {
    this.setState((prevState) => {
      return { sidebarOpen: !prevState.sidebarOpen };
    });
  };
  shadowShow = () => {
    this.setState({ sidebarOpen: false });
  };

  hideSideDrawer = () => {
    this.setState({sidebarOpen: false});
  }

  render() {
     // mobile
     let shadow;
     if (this.state.sidebarOpen) {
       shadow = <Backdrop click={this.shadowShow} />
     }
 
     let chores = {
       'chore1': { id: 'chore1', name: 'Clean dishwasher' },
       'chore2': { id: 'chore2', name: 'Clean fridge' },
       'chore3': { id: 'chore3', name: 'Wipe table' },
       'chore4': { id: 'chore4', name: 'Clean microwave' },
       'chore5': { id: 'chore5', name: 'Clean range hood' },
       'chore6': { id: 'chore6', name: 'Clean sink' },
       'chore7': { id: 'chore7', name: 'Fill ice trays' },
       'chore8': { id: 'chore8', name: 'Empty bin' }
     }
 
     // column
     let names = [];
     let tenantProp = this.props.tenants;
     if (tenantProp === undefined) {
       tenantProp = [];
     }
     for (let i = 0; i < tenantProp.length; i++) {
       names.push(tenantProp[i].name);
     }
     let colIds = [];
     for (let i = 2; i <= names.length + 1; i++) {
       colIds.push("column" + i)
     }
     let columns = {
       'column1': {
         id: 'column1',
         title: 'Chores to do',
         choreIds: ['chore1', 'chore2', 'chore3', 'chore4', 'chore5', 'chore6', 'chore7', 'chore8']
       }
     }
     for (let i = 0; i < colIds.length; i++) {
       let temp = colIds[i];
 
       columns[temp] = {
         id: colIds[i],
         title: names[i],
         choreIds: []
       }
     }
 
     // columnSort
     let columnSort = [];
     let temp;
     Object.keys(columns).map(el => {
       temp = columns[el].id
       columnSort.push(temp);
     })


    return (
      <div id="left-and-dashboard" className="">
          <div className="hamburger">
            <Toolbar drawerClickHandler={this.hamburgerShow} />
            <SideDrawer show={this.state.sidebarOpen} hide={this.hideSideDrawer} handleSignOut={this.props.handleSignOut}/>
            {shadow}
          </div>
          <Nav handleSignOut={this.props.handleSignOut} role={this.props.role}/>
            <main>
              <Switch>
                <Route exact path='/' component={() => (
                  <div className="sections-container">
                    <Cover avatar={this.props.avatar} role={this.props.role} displayName={this.props.displayName} rentPaid={this.props.handleRentPaid} utilitiesPaid={this.props.handleUtilitiesPaid} role={this.props.role}/>
                    <Overview />
                    <Todo />
                    { this.props.role === 'tenant' &&
                    <ChoresDashboard chores={this.props.chores}/>
                    }
                    <Calendar />
                    <PaymentStatus tenants={this.props.tenants}/>
                    <CollectedPayment payments={this.props.payments}/>
                    <Maintenance requests={this.props.requests}/>
                    <Chart />
                  </div>
                )} />
                {/* <Route exact path='/tenants' component={() => (
                  <div className="sections-container">
                    <RentBreakdown tenants={this.state.tenants} updateTenants={(tenants) => this.updateTenants(tenants)}/>
                  </div>
                  ) }/> */}
                <Route exact path='/about' component={() => (
                <div className="sections-container">
                  <About />
                </div>
                ) }/>
                <Route exact path='/request' component={() => (
                <div className="sections-container">
                  <RequestForm handleRequestSubmit={this.props.handleRequestSubmit}/>
                </div>
                ) }/>
                <Route exact path='/collect-payment' component={() => (
                <div className="sections-container">
                  <SubmitCollectPayment paymentSubmitCallback={this.props.handlePaymentSubmit} />
                </div>
                ) }/>
                <Route exact path='/chores' component={() => (
                  <div className="chores-main">
                    <Chores chores={chores} columns={columns} columnSort={columnSort} tenants={this.props.tenants} setChores={this.props.setChores}/>
                  </div>
                )} />
              </Switch>
            </main>
      </div>
    );
  }
}


export default App;