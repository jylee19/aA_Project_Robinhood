import React from 'react';
import { withRouter } from 'react-router';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.currentUser.id
        }
        if (this.props.currentUser.portfolio_id === null){
            this.props.makePortfolio(this.state)
            this.props.currentUser.portfolio_id = this.props.currentUser.id
        } else {
            this.props.showPortfolio(this.state.user_id);
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div>This is a test</div>
        )
    }


}

export default Dashboard