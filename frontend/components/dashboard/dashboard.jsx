import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.currentUser.id,
            portfolio_id: this.props.currentUser.id
        }
        // if (this.props.currentUser.portfolio_id === null){
        //     this.props.makePortfolio(this.state)
        //     this.props.updatePortfolioId(this.state);
        // } else {
        //     this.props.showPortfolio(this.state.id);
        // }
        this.signout = this.signout.bind(this);
    }

    signout(e){
        this.props.logout();
        
    }

    componentDidMount(){
        this.props.showPortfolio(this.state.portfolio_id)
    }

    render(){
        if(!this.props.currentPortfolio){
            return null
        } else{
            return(
                <div>
                    <div className="topnav">
                        <img className="logo-dashboard" src={window.logo} alt="cannot display"/>
                        <input id='dashboard-search-nav' type="text" placeholder="Search"></input>
                        <ul className='nav-dash-links'>
                            <div className='dash-links'>Free Stocks</div>
                            <div className='dash-links'>Portfolio</div>
                            <div className='dash-links'>Cash</div>
                            <div className='dash-links'>Messages</div>
                            <div className='dash-links'>Account</div>
                        </ul>
    
                    </div>
                    <br/>
                    <h2 id='portfolio-value'>{this.props.currentPortfolio.value}</h2>
                    <div className='buying-power'>
                        <div id='bp'>Buying Power</div>
                        <div id='liquidity' >{this.props.currentUser.available_liquidity}</div>
                    </div>
    
                    <br/>

                    <Link className="btn" to={`/users/${this.state.id}/edit`}>Change User Information</Link>
    
                    <br/>
                    <button id='log-out-btn' onClick={this.signout}>Log out</button>
                </div>
            )
        }

    }


}

export default Dashboard