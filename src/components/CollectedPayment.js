import React, {Component} from 'react';
import List from './List';


export default class CollectedPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let paymentsArray = [];
        let paymentsObj = this.props.payments;
        if (paymentsObj === undefined) {
            paymentsObj = [];
        }
        for (let i = 0; i < paymentsObj.length; i++) {
            paymentsArray.push([this.props.payments[i].type, this.props.payments[i].amount, this.props.payments[i].due,
                                this.props.payments[i].status]);
        }
        return(
            <section id="collected-payments" className="main-sections dash-section">
            <div className="home-section">
                <div className="section-header">
                    <h2>Collected Payments</h2>
                    <div>
                        {/* <img className="payment-plus icon" src="img/plus.png" alt="add payment" /> */}
                    </div>
                </div>
                <div className="collected-payment-container">
                    <List key="collected-payment" type='payments' items={paymentsArray}/>
                </div>
            </div>
          </section>
        );
    }
}