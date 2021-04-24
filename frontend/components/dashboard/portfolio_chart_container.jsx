import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import PortfolioChart from './portfolio_chart';

const mSTP = (state, ownProps) => {
    return{
        prev_close: ownProps.prev_close,
        value: ownProps.value,
        portfolio_id: ownProps.portfolio_id
    }

}

const mDTP = dispatch => ({
    showStock: stock => dispatch(showStock(stock)),
})

export default connect(mSTP, mDTP)(PortfolioChart)