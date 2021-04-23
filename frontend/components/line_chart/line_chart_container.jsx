import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import LineChart from './line_chart';


const mapStateToProps = (state, ownProps) => {
    return {
        abv: ownProps.abv,
        current_price: ownProps.current_price,
        annot: ownProps.annot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showStock: NYSE_abv => dispatch(showStock(stock)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);