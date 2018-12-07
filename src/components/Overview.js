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
                          <i>My Chore</i>
                      </td>
                      <td>
                          Clean 2nd floor bathroom
                      </td>
                  </tr>
                  <tr>
                      <td className="col1">
                          <i>My Rent</i>
                      </td>
                      <td>
                          $650 <small>of $8500</small>
                      </td>
                  </tr>
                  <tr>
                      <td className="col1">
                          <i>My Utilities</i>
                      </td>
                      <td>
                          $73 <small>of $534.21</small>
                      </td>
                  </tr>
                  <tr>
                      <td className="col1">
                          <i>My Room</i>
                      </td>
                      <td>
                          Single - 2B
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
        </section>
      );
    }
  }