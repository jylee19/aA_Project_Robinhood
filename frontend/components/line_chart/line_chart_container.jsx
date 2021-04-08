import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import LineChart from './line_chart';


const mapStateToProps = (state) => {
    return {
        currentStock: state.entities.stock
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showStock: NYSE_abv => dispatch(showStock(stock))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);