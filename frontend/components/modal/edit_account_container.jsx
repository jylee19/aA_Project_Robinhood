import { connect } from 'react-redux';

import EditAccount from './edit_account';
import { closeModal } from '../../actions/modal_actions';
import { requestUser, updateUserInfo } from '../../actions/session_actions';

const msp = (state) => ({
    currentUser: state.entities.user[state.session.id]
})

const mdp = dispatch => {
    return{
        closeModal: () => dispatch(closeModal()),
        action: user => dispatch(updateUserInfo(user)),
        requestUser: userId => dispatch(requestUser(userId))
    }
    
}

export default connect(msp,mdp)(EditAccount)