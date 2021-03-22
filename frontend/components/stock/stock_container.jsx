import { connect } from 'react-redux';
import { showStock, buyStock, sellStock } from '../../actions/stock_actions'
import Stock from './stock'


const mapStateToProps = (state) => {
    return {
        currentStock: state.entities.stock
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showStock: NYSE_abv => dispatch(showStock(NYSE_abv)),
        buyStock: (stock) => dispatch(buyStock(stock)),
        sellStock: (stock) => dispatch(sellStock(stock))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);