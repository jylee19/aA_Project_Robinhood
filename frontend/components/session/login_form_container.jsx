import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login } from '../../actions/session_actions';

const mSTP = (state) => {
    return {
        formType: 'login'
    }
}

const mDTP = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user))
    }
}

export default connect(mSTP, mDTP)(LoginForm)