import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout, login } from '../../actions/session_actions';
import { Redirect } from 'react-router-dom';
import { showPortfolio } from '../../actions/portfolio_actions';

class Home extends Component {

    constructor(props){
        super(props);
        this.state= {
            redirect: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.demo = this.demo.bind(this);
        this.begin = this.begin.bind(this);
        // this.setPortfolio = this.setPortfolio.bind(this);
    }

    componentDidMount(){
        
    }

    handleClick(e) {
        this.props.logout();
    }

    // setPortfolio(){
    //     console.log("Do I get here")
    //     this.props.showPortfolio(this.props.currentUser.id).then(() => this.setState({redirect: `/users/${this.props.currentUser.id}`});
    // }

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
            return <Redirect to={this.state.redirect}/>
        }
        // let display;
        // if (this.state.username === 'demoUser') {
        //     return(
        //         <div>
        //             <p>Welcome to the Robingoods demo!</p>
        //             <p>We hope that you'll learn a thing or two</p>
        //             <Link className="btn" to="/demo"><button>Click here to begin!</button></Link>
        //         </div>               
        //     )
        //  }
        // else if (this.props.currentUser) {
        // //     return this.setPortfolio();
        // } else {
        //     display = (
        //         <div>
        //             <Link className="btn" to="/signup">Signup</Link>
        //             <br/>
        //             <Link className="btn" to="/login">Login</Link>
        //             <br/>
        //             <button onClick={this.demo}>Want a test run?</button>
        //         </div>
        //     )
        // }

        return(
            <div>
                <header className="header">
                    <nav className="header-nav group">
                        <img className="logo" src={window.robinhood} alt="cannot display"/>
                        <ul className="header-nav-list group">
                            <li>
                                <Link id="login" className="btn" to="/login">Log In</Link>
                            </li>
                            <li>
                                <Link id="su" className="btn" to="/signup">Sign Up</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className='introtext'>
                    <div id="intro-content">
                        <h1 id="intro-title">Investing for Everyone</h1>
                        <p id="intro-body">Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply</p>
                        <button id="demo-button" onClick={this.demo}>Give us a try!</button>
                    </div>
                    {/* <button onClick={this.handleClick}>Logout</button> */}
                    <img className="home-image" src={window.homeImage}/>
                </div>

            </div>
        );
    }

}


export default Home;