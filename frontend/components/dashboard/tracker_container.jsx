import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import Tracker from './tracker';


const mSTP = (state, ownProps) => {
    return{
        asset: ownProps.asset,
        portfolio_id: ownProps.portfolio_id
    }
}

const mDTP = dispatch => ({
    showStock: stock => dispatch(showStock(stock)),
})

export default connect(mSTP, mDTP)(Tracker)