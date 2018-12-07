import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import { register } from '../serviceWorker';

export default class SubmitCollectPayments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: undefined,
            amount: undefined,
            due: undefined,
            loading: false,
            status: false
        }
    }

    componentWillUnmount() {
        console.log(this.spinnerInterval);
        console.log(this.statusInterval);
        clearInterval(this.statusInterval);
    }

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        this.setSpinnerInterval();
    } 

    setSpinnerInterval = () => {
       this.spinnerInterval = setInterval(() => {
            this.setState({status: true, loading:false});
            this.setStatusInterval();
       }, 2000);
    }

    setStatusInterval = () => {
        clearInterval(this.spinnerInterval);
        this.statusInterval = setInterval(() => {
            this.props.paymentSubmitCallback(this.state.type, this.state.amount, this.state.due, "UNPAID");
            // this.props.history.push('/');
        }, 5000)
    }

    render() {
        return(
            <section id="submit-collect-payment" className="main-sections">
            <div className="home-section">
                <div className="section-header">
                    <h2>Collect Payment</h2>
                    {/* <div>
                        <img className="payment-plus icon" src="img/plus.png" alt="add payment" />
                    </div> */}
                </div>
                <form className="submit-collect-payment-container">
                <div className="form-group">
                    <label htmlFor="type">Type</label><br/>
                    <input className="form-control" 
                        id="type" 
                        type="text" 
                        name="type"
                        onChange={this.handleChange}
                        />
                    </div>
                    
                    {/* amount */}
                    <div className="form-group">
                    <label htmlFor="amount">Amount</label><br/>
                    <input className="form-control" 
                        id="amount" 
                        type="text"
                        name="amount"
                        onChange={this.handleChange}
                        />
                    </div>

                    {/* due */}
                    <div className="form-group">
                    <label htmlFor="due">Due On</label><br/>
                    <input className="form-control" 
                        id="due" 
                        name="due"
                        onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-btn-group">
                        <button className="action-btn" onClick={this.handleSubmit}>
                        {this.state.loading &&
                        <div className="loading-spinner">
                        <ReactLoading type="spinningBubbles" color="#eaf3f9" height={30} width={30} />
                        </div>
                        }
                        {this.state.status && 
                        <p className="success">Maintenance Request Successfully!</p>
                        }
                        {!this.state.loading && !this.state.status &&
                        "Submit"
                        }
                        </button>
                    </div>
                </form>
            </div>
          </section>
        );
    }
}