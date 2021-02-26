import { connect } from 'react-redux';
import { makePortfolio, showPortfolio } from '../../actions/portfolio_actions';
import { updateUserInfo, logout } from '../../actions/session_actions';
import { showStock } from '../../actions/stock_actions'
import  Dashboard from './dashboard';

const mSTP = (state) => {
    return{
        currentUser: state.entities.user[state.session.id],
        currentPortfolio: state.entities.portfolio[state.session.id]
    }

}

const mDTP = dispatch => ({
    makePortfolio: portfolio => dispatch(makePortfolio(portfolio)),
    showPortfolio: portfolioId => dispatch(showPortfolio(portfolioId)),
    updatePortfolioId: user => dispatch(updateUserInfo(user)),
    showStock: stock => dispatch(showStock(stock)),
    logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(Dashboard)