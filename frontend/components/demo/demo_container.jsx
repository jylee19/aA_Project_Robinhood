import { connect } from 'react-redux';
import Demo from './demo';
import { logout, login } from '../../actions/session_actions';


const mSTP = (state, ownProps) => {
    return {
        demoUser: state.entities.user[state.session.id]
    }
}

const mDTP = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mSTP, mDTP)(Demo);