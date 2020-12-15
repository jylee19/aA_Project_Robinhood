import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout, login } from '../../actions/session_actions';

class Home extends Component {

    constructor(props){
        super(props);
        this.state= {
            username: "",
            password: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.demo = this.demo.bind(this);
        this.begin = this.begin.bind(this);
    }

    handleClick(e) {
        this.props.logout();
    }

    

    demo(e){
        e.preventDefault();
        this.setState({ username: 'demoUser' });
        this.setState({ password: 'demoUser1' });
    }

    begin(e){
        // e.preventDefault();
        this.props.startDemo(this.state);
    }

    componentDidUpdate(){
        if(this.props.currentUser === undefined && this.state.username === 'demoUser'){
            this.props.startDemo(this.state);
        }
    }


    render() {
        let display;
        if (this.state.username === 'demoUser') {
            display = (
                <div>
                    <p>Welcome to the Robingoods demo!</p>
                    <p>We hope that you'll learn a thing or two</p>
                    <Link className="btn" to="/demo"><button>Click here to begin!</button></Link>
                </div>
            )
         } else if (this.props.currentUser) {
            display = (
                <div>
                    <p>Hello, {this.props.currentUser.username}</p>
                    <p>User id is {this.state.id}</p>
                    <Link className="btn" to={ `/users/${this.props.currentUser.id}/edit` }>Change user information</Link>
                    <br/>
                    <button onClick={this.handleClick}>Logout</button>
                </div>
            )
        } else {
            display = (
                <div>
                    <Link className="btn" to="/signup">Signup</Link>
                    <br/>
                    <Link className="btn" to="/login">Login</Link>
                    <br/>
                    <button onClick={this.demo}>Want a test run?</button>
                </div>
            )
        }

        return(
            <div>
                <h1>Welcome to Robingoods</h1>
                {display}
            </div>
        );
    }

}


export default Home;