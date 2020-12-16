import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout, login } from '../../actions/session_actions';
import { Redirect } from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
        this.state= {
            redirect: null
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
        let demo = {
            username: 'demoUser',
            password: 'demoUser1'
        }
        this.props.startDemo(demo).then(() => this.setState({ redirect: `/demo` }));
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
        if (this.state.redirect) {
            console.log(this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        }
        let display;
        if (this.state.username === 'demoUser') {
            display = (
                <div>
                    <p>Welcome to the Robingoods demo!</p>
                    <p>We hope that you'll learn a thing or two</p>
                    <Link className="btn" to="/demo"><button>Click here to begin!</button></Link>
                </div>
            )
        //  } else if (this.props.currentUser) {
        //     display = (
        //         <div>
        //             <p>Hello, {this.props.currentUser.username}</p>
        //             <p>User id is {this.state.id}</p>
        //             <Link className="btn" to={ `/users/${this.props.currentUser.id}/edit` }>Change user information</Link>
        //             <br/>
        //             <button onClick={this.handleClick}>Logout</button>
        //         </div>
        //     )
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
                <div className="topnav">
                    <Link className="btn" to="/login">Login</Link>
                    <Link className="btn" to="/signup">Sign Up</Link>

                </div>
                <h1>Investing for Everyone</h1>
                <p>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply</p>
                <button onClick={this.demo}>Want a test run?</button>
                <button onClick={this.handleClick}>Logout</button>
            </div>
        );
    }

}


export default Home;