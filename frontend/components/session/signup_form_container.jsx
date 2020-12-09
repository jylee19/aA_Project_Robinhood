import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup } from '../../actions/session_actions'


const mapStateToProps = (state) => {
    return {
        formType: 'Sign up'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: (user) => dispatch(signup(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);