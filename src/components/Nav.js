import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Left navigation bar
export default class Nav extends Component {
    render() {
      return (
        <div id="left-nav">
            <div className="nav-section housely">
                <h2>Housely</h2>
                <img className="exist" src="img/exit.png" alt="exit menu" />
            </div>
            <NavLink exact to='/' activeClassName="current-section" className="nav-section dashboard">
                <div className="left-block"></div>
                <h2>Dashboard</h2>
                <img src="img/arrow.png" alt="Detail Arrow" />
            </NavLink>
            <NavLink exact to='/request' activeClassName="current-section" className="nav-section request-tab">
                <div className="left-block"></div>
                <h2>Submit Requests</h2>
                <img src="img/arrow.png" alt="Detail Arrow" />
            </NavLink>
            { this.props.role === 'tenant' &&
            <NavLink exact to='/chores' activeClassName="current-section" className="nav-section chores-tab">
              <div className="left-block"></div>
              <h2>Chores</h2>
              <img src="img/arrow.png" alt="Detail Arrow" />
            </NavLink>
            }
            {/* <NavLink to='/tenants' activeClassName="current-section" className="nav-section rent-tab">
                <div className="left-block"></div>
                <h2>Rent Breakdown</h2>
                <img src="img/arrow.png" alt="Detail Arrow" />
            </NavLink> */}
            { this.props.role === 'landlord' &&
            <NavLink to='/collect-payment' activeClassName="current-section" className="nav-section collect-tab">
                <div className="left-block"></div>
                <h2>Collect Payment</h2>
                <img src="img/arrow.png" alt="Detail Arrow" />
            </NavLink>
            }
            <NavLink to='/about' activeClassName="current-section" className="nav-section">
                <div className="left-block"></div>
                <h2>About</h2>
                <img src="img/arrow.png" alt="Detail Arrow" />
            </NavLink>
            <a onClick={this.props.handleSignOut} className="sign-out nav-section">
                <div className="left-block"></div>
                <h2>Sign Out</h2>
                <img src="img/arrow.png" alt="Detail Arrow" />
            </a>
        </div>
      );
    }
  }