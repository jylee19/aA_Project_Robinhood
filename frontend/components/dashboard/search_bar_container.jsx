import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import SearchBar from './dashboard';

const mSTP = (state) => {

}

const mDTP = dispatch => ({
    showStock: stock => dispatch(showStock(stock)),
})

export default connect(mSTP, mDTP)(SearchBar)