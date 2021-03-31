import { connect } from 'react-redux';
import { showStock, buyStock, sellStock } from '../../actions/stock_actions'
import Stock from './stock'


const mapStateToProps = (state) => {
    return {
        currentStock: state.entities.stock,
        currentPortfolio: state.entities.portfolio[state.session.id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showStock: NYSE_abv => dispatch(showStock(stock)),
        buyStock: (stock) => dispatch(buyStock(stock)),
        sellStock: (stock) => dispatch(sellStock(stock))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);