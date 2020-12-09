import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

class Demo extends React.Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        //set state to default before logging out
        this.props.logout();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Welcome to a Robingoods demo! Make yourself at home!</h1>
                <br/>
                <p>Hello there {this.props.demoUser.username}!</p>

                <Link className='btn' to='/signup'><button onClick={this.handleClick}>Ready to start your investing adventure?</button></Link>

            </React.Fragment>
        )
    }


}

export default Demo;