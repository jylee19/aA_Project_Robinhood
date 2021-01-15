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
                        <input type="text" placeholder="Search"></input>
    
                    </div>
                    <br/>
                    <h2>{this.props.currentPortfolio.value}</h2>
                    <p>Buying Power</p>
                    <p>{this.props.currentUser.available_liquidity}</p>
    

                    <Link className="btn" to={`/users/${this.state.id}/edit`}>Change User Information</Link>
    
    
                    <button onClick={this.signout}>Log out</button>
                </div>
            )
        }

    }


}

export default Dashboard