import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.user.id,
            email: this.props.user.email,
            username: this.props.user.username,
            password: "",
            redirect: null
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field){
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    handleSubmit(e) {
        // e.preventDefault(); //Chain on creating a portfolio after
        if (this.props.formType === 'Update User'){
            this.props.action(this.state).then(() => this.setState({ redirect: `/users` }));
        } else{
            this.props.action(this.state);
        }

    }



    render() {
        let errors;
        if (this.props.errors) errors = this.props.errors.map(err => (<h2>{err}</h2>));
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        let display;
        if (this.props.formType === 'Sign up') {
            display = (
                <React.Fragment>
                    <div id="signup-logo">
                        <img className="logo" src={window.robinhood} alt="cannot display"/>
                    </div>
                    <div className="signup-form">
                        <h1 id="form-title">Make Your Money Move</h1>
                        <p id="signup-body">Robingoods lets you invest in companies you love, commission-free.</p>
                        <form onSubmit={ this.handleSubmit }>
                            <input className="su-values" id='email' type='text' placeholder="Email" value={ this.state.email } onChange={ this.update('email') }></input>        
                            <br/>
                            <input className="su-values" id='un' type='text' placeholder="Username" value={ this.state.username } onChange={ this.update('username') }></input>
                            <br/>
                            <input className="su-values" id='pass' type='password' placeholder="Password (min. 6 characters)" value={ this.state.password } onChange={ this.update('password') }></input>
                        <ul>
                            {errors}
                        </ul>
                        <Link id='session-swap' to='/login'>Already have an account? Click here to login!</Link>
                        <br/>
                        <button id="signup-button">{this.props.formType}</button>
                        </form>
                    </div>
                    <br/>
                </React.Fragment>
            )
        } else {
            display = (
                <React.Fragment>
                    <div className="edit-container">
                        <h1 id="demo-title">Change user information</h1>
                        <form className="demo-form" onSubmit={ this.handleSubmit }>
                        <label>Email:
                            <br/>
                            <input className="edit-values" id='email' type='text' value={ this.state.email } onChange={ this.update('email') }></input>
                        </label>    
                        <br/>            
                        <label>Username:
                            <br/>
                            <input className="edit-values" id='un' type='text' value={ this.state.username } onChange={ this.update('username') }></input>
                        </label>
                        <br/>
                        <label>Password:
                            <br/>
                            <input className="edit-values" id='pass' type='password' placeholder="Re-enter or change password" value={ this.state.password } onChange={ this.update('password') }></input>
                        </label>
                        <ul>
                            {errors}
                        </ul>
                        <button id="edit-button">{this.props.formType}</button>
                        </form>
                    </div>
                </React.Fragment>
            )
        }
        return(
            <div>
                {display}
            </div>
        )
    }

}

export default SignupForm;