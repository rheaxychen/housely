import React, {Component} from 'react';

// Overview widget component
export default class Overview extends Component {
    render() {
      return (
        <section id="overview" className="main-sections dash-section">
          <div className="home-section">
              <div className="section-header">
                  <h2>Overview</h2>
              </div>
              <table>
                  <tbody>
                  <tr>
                      <td className="col1">
                          <i>Total Rent</i>
                      </td>
                      <td>
                         ${this.props.total}
                      </td>
                  </tr>
                  <tr>
                      <td className="col1">
                          <i>Property Address</i>
                      </td>
                      <td>
                          {this.props.address}
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
        </section>
      );
    }
  }