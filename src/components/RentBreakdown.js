import React, { Component } from 'react';

// Rent breakdown setup widget component  
export default class RentBreakdown extends Component {
    constructor(props) {
      super(props);
      this.state = {
        numberTenants: 0,
        tenants: []
      }
    }
  
    handleNameChange = (event, i) => {
      let tenants = this.state.tenants;
      tenants[i].name = event.target.value;
      this.setState({
        tenants: tenants
      });
    }
  
    handleRentChange = (event, i) => {
      let tenants = this.state.tenants;
      tenants[i].rent = event.target.value;
      this.setState({
        tenants: tenants
      });
    }
  
    handleAddressChange = (event) => {
      let field = event.target.name;
      let value = event.target.value;
      let changes = {};
      changes[field] = value;
      this.setState(changes);
    }
  
    renderList = (event) => {
      this.setState({numberTenants: parseInt(event.target.value)});
    }
  
    setTenants = () => {
      this.props.updateTenants(this.state.tenants, this.state.property);
    }
  
    render() {
      let num = this.state.numberTenants;
      let list = [];
      for (let i = 0; i < num; i++) {
        let tenants = this.state.tenants;
          if (this.state.tenants[i] === undefined) {
          tenants.push({
            name: "",
            rent: null,
            statusRent: "UNPAID",
            statusUtilities: "UNPAID"
          });
        }
        list.push(
          <div key={i} className="tenant-container">
            <input onChange={(event) => this.handleNameChange(event, i)} value={this.state.tenants[i].name} className="list-name" type="text" placeholder="Enter Name" />
            <div>
              <p className="dollar-sign">$</p>
              <input onChange={(event) => this.handleRentChange(event, i)} className="list-rent" type="text"  />
            </div>
          </div>
        );
      }
      return(
        <section id="rent-section" className="main-sections">
            <div id="rent-breakdown">
                <div className="section-header">
                    <h2>Property Information</h2>
                </div>
                <div className="form-group">
                <label htmlFor="property">Address</label><br/>
                <input className="form-control" 
                    id="property" 
                    type="text" 
                    name="property"
                    onChange={this.handleAddressChange}
                    />
                </div>
                {this.props.role === 'tenant' &&
                <div>
                  <div className="section-header">
                      <h2>Rent Breakdown</h2>
                  </div>
                  <div className="tenants-total">
                      <p>Number of tenants: </p>
                      <input onBlur={this.renderList} type='text' />
                  </div>
                  <div className="tenants-list">
                  {list}
                  </div>
                </div>
                }
                <button onClick={this.setTenants} className="action-btn">
                  Set Property Info
                </button>
            </div>
        </section>
      );
    }
  }