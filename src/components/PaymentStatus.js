import React, { Component } from 'react';

// Payment status widget component
export default class PaymentStatus extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      let tenantProp = this.props.tenants;
      let tenantsRent = [];
      let tenantsUtilities = [];
      for (let i = 0; i < this.props.tenants.length; i++) {
        let rent = tenantProp[i].statusRent === 'PAID' ? 'paid' : 'unpaid';
        tenantsRent.push(
          <div key={"rent" + i}>
            <p className={"status " + rent}>{tenantProp[i].statusRent}</p>
            <p>{tenantProp[i].name}</p>
          </div>
        );
        let utilities = tenantProp[i].statusUtilities === 'PAID' ? 'paid' : 'unpaid';
        tenantsUtilities.push(
          <div key={"utilities" + i}>
            <p className={"status " + utilities}>{tenantProp[i].statusUtilities}</p>
            <p>{tenantProp[i].name}</p>
          </div>
        );
      }
  
  
      return (
        <section id="paid-status-section" className="main-sections dash-section">
            <div id="paid-status" className="home-section">
                <div className="section-header">
                    <h2>Tenant Payment Status</h2>
                </div>
                <div id="rent-status" className="statuses">
                    <h3>
                        Rent
                    </h3>
              <div className="rent-wrapper">
                {tenantsRent}
              </div>
            </div>
            <div id="utilities-status" className="statuses">
              <h3>
                Utilities
                    </h3>
              <div className="utilities-wrapper">
                {tenantsUtilities}
              </div>
            </div>
          </div>
        </section>
      );
    }
  }