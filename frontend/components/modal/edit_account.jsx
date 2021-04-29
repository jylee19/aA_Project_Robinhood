import React from 'react';
import { Redirect } from 'react-router-dom';

class EditAccount extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            id: this.props.currentUser.id,
            email: this.props.currentUser.email,
            username: this.props.currentUser.username,
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let changes;
        if (this.state.password != ""){
            this.props.action(this.state)
        } else {
            changes = {
                id: this.state.id,
                email: this.state.email,
                username: this.state.username
            }
            this.props.action(this.state)
        }
        
        this.props.closeModal();
    }

    update(field){
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    render(){
        if(this.state.email == 'demoUser@demo.com' || this.state.username == 'demoUser'){
            return(
                <div className = 'modal-form-deny'>
                    <p id='modal-deny'>Changing account information not available for demo use</p>
                </div>
            )
        } else {
            return(
                <div className="modal-form">
                    <h1 id="modal-edit-title">Change User Information</h1>
                    <form className="modal-box" onSubmit={ this.handleSubmit } autoComplete='off'>
                        <label>Email:
                            <input className="edit-values" id='email' type='text' value={ this.state.email } onChange={ this.update('email')}></input>
                        </label>                
                        <label>Username:
                            <input className="edit-values" id='un' type='text' value={ this.state.username } onChange={ this.update('username') }></input>
                        </label>
                        <label>Password:
                            <input className="edit-values" id='pass' type='password' placeholder="Re-enter or change password" value={ this.state.password } onChange={ this.update('password') }></input>
                        </label>
                        <button id="edit-button">Edit Account Info</button>
                    </form>
                </div>
            )
        }
        

    }

}

export default EditAccount