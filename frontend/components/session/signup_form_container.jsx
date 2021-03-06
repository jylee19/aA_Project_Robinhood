import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup } from '../../actions/session_actions';
import { makePortfolio } from '../../actions/portfolio_actions';


const mapStateToProps = (state) => {
    return {
        user: {
            email: "",
            username: "",
            password: ""
        },
        formType: 'Sign up'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: (user) => dispatch(signup(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);