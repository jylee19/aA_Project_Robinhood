import { connect } from 'react-redux';
import React from 'react';
import SignupForm from './signup_form';
import { requestUser, updateUserInfo } from '../../actions/session_actions';


class EditUserForm extends React.Component {
    render(){
        const { action, formType, user } = this.props;
        if (!user) return null;
        return (
            <SignupForm
                action={action}
                formType={formType}
                user={user} />
        );
    }
}


const mSTP = (state, ownProps) => {
    return {
        user: state.entities.user[ownProps.match.params.userId],
        formType: 'Update User'
    }
}

const mDTP = dispatch => {
    return {
        action: user => dispatch(updateUserInfo(user)),
        requestUser: userId => dispatch(requestUser(userId))
    }
}

export default connect(mSTP, mDTP)(SignupForm)