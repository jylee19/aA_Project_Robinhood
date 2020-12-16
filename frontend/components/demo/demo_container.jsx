import { connect } from 'react-redux';
import Demo from './demo';
import { logout, login, updateUserInfo } from '../../actions/session_actions';
import { showPortfolio } from '../../actions/portfolio_actions';


const mSTP = (state, ownProps) => {
    return {
        demoUser: state.entities.user[state.session.id]
    }
}

const mDTP = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        fetchPortfolio: portfolioId => dispatch(showPortfolio(portfolioId)),
        updatePortfolioId: user => dispatch(updateUserInfo(user))
    }
}

export default connect(mSTP, mDTP)(Demo);