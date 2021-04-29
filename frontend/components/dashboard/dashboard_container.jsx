import { connect } from 'react-redux';
import React from 'react';
import { makePortfolio, showPortfolio } from '../../actions/portfolio_actions';
import { updateUserInfo, logout } from '../../actions/session_actions';
import { showStock } from '../../actions/stock_actions'
import Dashboard from './dashboard';
import { openModal, closeModal } from '../../actions/modal_actions';

const mSTP = (state) => {
    const currentUser = state.entities.user[state.session.id]
    const currentPortfolio = state.entities.portfolio[state.session.id]
    return{
        currentUser: currentUser,
        currentPortfolio: currentPortfolio
    }

}

const mDTP = (dispatch) => ({
    makePortfolio: portfolio => dispatch(makePortfolio(portfolio)),
    showPortfolio: portfolioId => dispatch(showPortfolio(portfolioId)),
    updatePortfolioId: user => dispatch(updateUserInfo(user)),
    showStock: stock => dispatch(showStock(stock)),
    logout: () => dispatch(logout()),
    otherForm: (
      <btn className="dash-links" onClick={() => dispatch (openModal('edit'))}>
        Account
      </btn>
    ),
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Dashboard)