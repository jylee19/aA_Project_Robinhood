import { connect } from 'react-redux';

import EditAccount from './edit_account';
import { closeModal } from '../../actions/modal_actions';

const msp = (state) => ({
    currentUserId: state.session.user.id
})

const mdp = dispatch => {
    return{
        closeModal: () => dispatch(closeModal())
    }
    
}

export default connect(msp,mdp)(EditAccount)