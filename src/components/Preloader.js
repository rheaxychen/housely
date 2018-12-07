import React, {Component} from 'react';
// Site preloader animation
export default class Preloader extends Component {
    render() {
        return( 
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
        );
    }
}