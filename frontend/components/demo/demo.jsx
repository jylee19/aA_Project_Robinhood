import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { Redirect } from 'react-router-dom';

class Demo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.demoUser.id,
            portfolio_id: this.props.demoUser.id
        }
        if (this.props.demoUser.portfolio_id === null){
            this.props.updatePortfolioId(this.state);
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        console.log(this.state.portfolio_id)
        this.props.fetchPortfolio(this.state.portfolio_id);
    }

    handleClick(e) {
        //set state to default before logging out
        this.props.logout()
    }

    render() {
        if (this.state.redirect) {
            console.log(this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <React.Fragment>
                <h1>Welcome to a Robingoods demo! Make yourself at home!</h1>
                <br/>
                <p>Hello there {this.props.demoUser.username}!</p>

                <Link className="btn" to='/signup'><button onClick={this.handleClick}>Ready to start your investing adventure?</button></Link>
            </React.Fragment>
        )
    }


}

export default Demo;