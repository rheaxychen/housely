import React, { Component } from 'react';

// Cover profile widget component
export default class Cover extends Component {
    render() {
      let role = this.props.role.charAt(0).toUpperCase() + this.props.role.slice(1);
      let avatar = this.props.avatar;
      if (avatar === undefined || avatar === null) {
        avatar = 'img/profile.png';
      }
      return (
        <section id="cover-section" className="main-sections dash-section">
          <div id="profile-and-text">
              <div id="profile-container">
                  <img src={avatar} alt="profile picture" />
              </div>
              <div id="profile-text">
                  <h4>{this.props.displayName}, {role}</h4>
                  <h4></h4>
              </div>
          </div>
          { this.props.role === 'tenant' &&
          <div id="pay-buttons">
              <button onClick={this.props.rentPaid}>
                  Pay Rent
              </button>
              <button onClick={this.props.utilitiesPaid}>
                  Pay Utilities
              </button>
          </div>
          }
        </section>
      );
    }
  }