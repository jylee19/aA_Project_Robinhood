import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { Redirect } from 'react-router-dom';

class Demo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.demoUser.id,
            portfolio_id: this.props.demoUser.id,
            redirect: null
        }
        // if (this.props.demoUser.portfolio_id === null){
        //     this.props.updatePortfolioId(this.state);
        // }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        this.props.fetchPortfolio(this.state.portfolio_id);
    }

    handleClick(e) {
        //set state to default before logging out
        this.props.logout().then(() => this.setState({ redirect: `/signup` }));
    }

    render() {
        if (this.state.redirect) {
            console.log(this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <React.Fragment>
                <div className="demo-container">
                    <h1 id="demo-title">Welcome to a Robingoods demo! Make yourself at home!</h1>
                    <img className="demo-image" src={window.firePlace}/>
                    <br/>
                    <p id="demo-quote">The key to making money in stocks is to not get scared out of them. - Peter Lynch</p>
                    {/* <p>Hello there {this.props.demoUser.username}!</p> */}

                    <button id="demo-end" onClick={this.handleClick}>Ready to start your investing adventure?</button>
                </div>
            </React.Fragment>
        )
    }


}

export default Demo;