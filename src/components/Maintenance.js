import React, {Component} from 'react';
import List from './List';

export default class Maintenance extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log(this.props.requests);
        let requestsArray = [];
        let requestsObj = this.props.requests;
        if (requestsObj === undefined) {
            requestsObj = [];
        }
        // console.log(requestsObj);
        for (let i = 0; i < requestsObj.length; i++) {
            requestsArray.push([this.props.requests[i].type, this.props.requests[i].description, this.props.requests[i].priority]);
        }
        return(
            <section id="maintenance" className="main-sections dash-section">
            <div className="home-section">
                <div className="section-header">
                    <h2>Maintenance Requests</h2>
                    <div>
                        {/* onClick switch Route */}
                        {/* <img onClick={this.addRequest} className="request-plus icon" src="img/plus.png" alt="add request" /> */}
                    </div>
                </div>
                <div className="maintenance-container">
                    <List key="maintenance-request" type='maintenance' items={requestsArray}/>
                </div>
            </div>
          </section>
        );
    }
}


