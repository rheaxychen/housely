import React, {Component} from 'react';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            handle: undefined,
            avatar: undefined,
            role: undefined
        };
    }

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    handleRadioChange = (value) => {
        this.setState({
            role: value
        });
    }

    handleSignUp = (event) => {
        event.preventDefault();
        let avatar = this.state.avatar;
        this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar, this.state.role);
    }

    handleSignIn = (event) => {
        event.preventDefault();
        this.props.signInCallback(this.state.email, this.state.password);
    }

    render() {
        return (
            <section id="signup" className="main-sections">
            <div className="home-section">
                <div className="section-header">
                    <h2>Log In</h2>

                </div>
                <form className="signup-container">
                        {/* email */}
                        <div className="form-group">
                        <label htmlFor="email">Email</label><br/>
                        <input className="form-control" 
                            id="email" 
                            type="email" 
                            name="email"
                            onChange={this.handleChange}
                            />
                        </div>
                        
                        {/* password */}
                        <div className="form-group">
                        <label htmlFor="password">Password</label><br/>
                        <input className="form-control" 
                            id="password" 
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            />
                        </div>

                        {/* handle */}
                        <div className="form-group">
                        <label htmlFor="handle">Your Name</label><br/>
                        <input className="form-control" 
                            id="handle" 
                            name="handle"
                            onChange={this.handleChange}
                            />
                        </div>

                        {/* avatar */}
                        <div className="form-group">
                        <img className="avatar" src={this.state.avatar || 'img/no-user-pic.png'} alt="avatar preview" />
                        <label htmlFor="avatar">Avatar Image URL</label><br/>
                        <input className="form-control" 
                            id="avatar" 
                            name="avatar" 
                            placeholder="http://www.example.com/my-picture.jpg" 
                            onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-role-group">
                            {/* <input onClick={this.handleChange} id="tenant" type="radio" name="role" value="tenant"/>
                            <label className="radio" htmlFor="tenant">
                                <span className="big">
                                <span className="small"></span>
                                </span>I'm a tenant
                            </label><br />
                            <input onClick={this.handleChange} id="landlord" type="radio" name="role" value="landlord" />
                            <label className="radio" htmlFor="landlord">
                                <span className="big">
                                <span className="small"></span>
                                </span>I'm a landlord
                            </label> */}
                            <RadioGroup onChange={ this.handleRadioChange }>
                                <ReversedRadioButton value="tenant" pointColor="#e65c00" iconSize={20}>
                                    I'm a tenant
                                </ReversedRadioButton>
                                <ReversedRadioButton value="landlord" pointColor="#e65c00" iconSize={20}>
                                    I'm a landlord
                                </ReversedRadioButton>
                            </RadioGroup>
                        </div>

                        {/* buttons */}
                        <div className="form-btn-group">
                        <button className="action-btn signup-btn" onClick={this.handleSignUp}>Sign-up</button>
                        <button className="action-btn signin-btn" onClick={this.handleSignIn}>Sign-in</button>
                        </div>
                    </form>
            </div>
          </section>
        );
    }
}
