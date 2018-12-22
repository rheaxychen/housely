import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactLoading from 'react-loading';
import { Redirect, withRouter } from 'react-router-dom';

const options_type = [
    'Dish Washer', 'Doors and Locks', 'Heating', 'Hot Water', 'Leaks', 'Plumbing', 'Smoke Detector', 'Washer and Dryer', 'Toilet', 'Others (Please specify in the Description)'
  ];
const defaultOption_type = options_type[0];

const options_priority = [
    'LOW', 'MEDIUM', 'HIGH'
  ];
const defaultOption_priority = options_priority[0];

class RequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            type: '',
            description: '',
            note: '', // entry note (e.g. please confirm with the tenant before come in)
            img: '',
            priority: '',
            loading: false,
            status: false
        };
        // this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.statusInterval);
    }

    handleChange = (event) => {
        let field = event.target.name; //which input
        let value = event.target.value; //what value
        let changes = {}; //object to hold changes
        if (field === 'img') {
            changes[field] = event.target.files[0];
        } else {
            changes[field] = value; //change this field
        }
        this.setState(changes); //update state
    }

    handleRequestSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true}, this.setSpinnerInterval);
    } 

    setSpinnerInterval = () => {
       this.spinnerInterval = setInterval(() => {
            this.setState({status: true, loading:false}, this.setStatusInterval);
       }, 2000);
    }

    setStatusInterval = () => {
        clearInterval(this.spinnerInterval);
        this.statusInterval = setInterval(() => {
            this.props.handleRequestSubmit(this.state.unit, this.state.type, this.state.description,
                this.state.note, this.state.img, this.state.priority);
            // this.props.history.push('/');
        }, 2000)
    }

    onSelectType = (event) => {
        this.setState({type: event.value});
    }

    onSelectPriority = (event) => {
        this.setState({priority: event.value});
    }

    render () {
        return(
            <section id="request" className="main-sections">
                {/* {this.state.redirect &&
                    <Redirect to="/" />
                } */}
                <div id="request-container">
                    <div className="section-header">
                        <h2>Submit Maintenance Request</h2>
                    </div>
                    <div className="section-container">
                        <form>
                            {/* unit */}
                            <div className="form-group">
                                <label htmlFor="unit">Unit</label>
                                <input className="form-control" 
                                    id="unit" 
                                    type="text" 
                                    name="unit"
                                    onChange={this.handleChange}
                                    />
                            </div>

                            {/* request type dropdown */}
                            <div className="form-group">
                                <label htmlFor="type">Request Type</label>
                                <Dropdown className="dropdown" name="type" options={options_type} onChange={this.onSelectType} value={this.state.type} placeholder="Select an option" />
                            </div>

                            {/* description */}
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input className="form-control" 
                                    id="description" 
                                    type="text"
                                    name="description"
                                    onChange={this.handleChange}
                                    />
                            </div>

                            {/* entry note */}
                            <div className="form-group">
                                <label htmlFor="note">Entry Note</label>
                                <input className="form-control" 
                                    id="note" 
                                    type="text"
                                    name="note"
                                    onChange={this.handleChange}
                                    />
                            </div>

                            {/* upload photo */}
                            <div className="form-group">
                                <label htmlFor="img">Upload Images</label>
                                <input className="form-control" 
                                    id="img" 
                                    type="file"
                                    name="img"
                                    accept="image/*"
                                    onChange={this.handleChange}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <Dropdown className="dropdown" name="priority" options={options_priority} onChange={this.onSelectPriority} value={this.state.priority} placeholder="Select an option" />
                            </div>

                            <button onClick={this.handleRequestSubmit} className="action-btn request-btn">
                            {this.state.loading &&
                            <div className="loading-spinner">
                            <ReactLoading type="spinningBubbles" color="#eaf3f9" height={30} width={30} />
                            </div>
                            }
                            {this.state.status && 
                            <p className="success">Maintenance Request Successful!</p>
                            }
                            {!this.state.loading && !this.state.status &&
                            "Submit"
                            }
                            </button>

                        </form>
                    </div>
                </div>
            </section>
          );
    }
}

export default withRouter(RequestForm);