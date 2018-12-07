import React, {Component} from 'react';
import List from './List';

export default class ChoresDashboard extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        // let requestsArray = [];
        // let requestsObj = this.props.requests;
        // if (requestsObj === undefined) {
        //     requestsObj = [];
        // }
        // console.log(requestsObj);
        // for (let i = 0; i < requestsObj.length; i++) {
        //     requestsArray.push([this.props.requests[i].unit, this.props.requests[i].type, this.props.requests[i].priority]);
        // }
        console.log(this.props.chores);
        let choresArray = [];
        for (let i = 0; i < this.props.chores.length; i++) {
            if (this.props.chores[i].chores !== undefined) {
                for (let s = 0; s < this.props.chores[i].chores.length; s++) {
                    choresArray.push([
                        this.props.chores[i].chores[s],
                        this.props.chores[i].tenant,
                        "NOT DONE"
                    ]);
                }
            }
        }
        console.log(choresArray);
        return(
            <section id="chores" className="main-sections dash-section">
            <div className="home-section">
                <div className="section-header">
                    <h2>Chores</h2>
                    <div>
                        {/* onClick switch Route */}
                        {/* <img onClick={this.addRequest} className="request-plus icon" src="img/plus.png" alt="add request" /> */}
                    </div>
                </div>
                <div className="chores-container">
                    <List key="chores" type='chores' items={choresArray}/>
                </div>
            </div>
          </section>
        );
    }
}


