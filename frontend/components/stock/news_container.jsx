import { connect } from 'react-redux';
import { showStock } from '../../actions/stock_actions'
import News from './news';


const mapStateToProps = (state, ownProps) => {
    return {
        currentStockAbv: ownProps.abv
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);