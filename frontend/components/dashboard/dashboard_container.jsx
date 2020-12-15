import { connect } from 'react-redux';
import { makePortfolio, showPortfolio } from '../../actions/portfolio_actions'
import  Dashboard from './dashboard'

const mSTP = (state) => {
    return{
        currentUser: state.entities.user[state.session.id],
    }

}

const mDTP = dispatch => ({
    makePortfolio: portfolio => dispatch(makePortfolio(portfolio)),
    showPortfolio: portfolioId => dispatch(showPortfolio(portfolioId))
})

export default connect(mSTP, mDTP)(Dashboard)