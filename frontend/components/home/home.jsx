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
        this.demo = this.demo.bind(this);
    }


    demo(e){
        e.preventDefault();
        this.setState({ redirect: `/login` });
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

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
                    <img className="home-image" src={window.homeImage}/>
                </div>

            </div>
        );
    }

}


export default Home;