import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import Stock from './stock'


const mapStateToProps = (state) => {
    return {
        currentStock: state.entities.stock
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showStock: NYSE_abv => dispatch(showStock(NYSE_abv))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);