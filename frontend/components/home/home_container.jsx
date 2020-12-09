import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session_actions'


const mapStateToProps = (state) => {
    return {
        currentUser: state.users[state.session.id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);