import { connect } from 'react-redux';
import Home from './home';
import { logout, login } from '../../actions/session_actions'


const mapStateToProps = (state) => {
    return {
        currentUser: state.user[state.session.id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        startDemo: (user) => dispatch(login(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);