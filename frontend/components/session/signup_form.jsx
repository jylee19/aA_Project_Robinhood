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
            this.props.action(this.state).then(() => this.setState({ redirect: `/users/${this.state.id}` }));
        } else{
            this.props.action(this.state);
        }

    }



    render() {
        let errors;
        if (this.props.errors) errors = this.props.errors.map(err => (<h2>{err}</h2>));
        if (this.state.redirect) {
            console.log(this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        }
        let display;
        if (this.props.formType === 'Sign up') {
            display = (
                <React.Fragment>
                    <h1>Robingoods</h1>
                    <h1>Make Your Money Move</h1>
                    <p>Robingoods lets you invest in companies you love, commission-free.</p>
                    <p></p>
                    <form onSubmit={ this.handleSubmit }>
                    <label>Email:
                        <input id='email' type='text' value={ this.state.email } onChange={ this.update('email') }></input>
                    </label>                
                    <label>Username:
                        <input id='un' type='text' value={ this.state.username } onChange={ this.update('username') }></input>
                    </label>
                    <label>Password:
                        <input id='pass' type='password' value={ this.state.password } onChange={ this.update('password') }></input>
                    </label>
                    <ul>
                        {errors}
                    </ul>
                    <button>{this.props.formType}</button>
                    </form>
                    <br/>
                    <Link className="btn" to="/demo">Want a test run?</Link>
                </React.Fragment>
            )
        } else {
            display = (
                <React.Fragment>
                    <h1>Change user information</h1>
                    <form onSubmit={ this.handleSubmit }>
                    <label>Email:
                        <input id='email' type='text' value={ this.state.email } onChange={ this.update('email') }></input>
                    </label>                
                    <label>Username:
                        <input id='un' type='text' value={ this.state.username } onChange={ this.update('username') }></input>
                    </label>
                    <label>Password:
                        <input id='pass' type='password' value={ this.state.password } onChange={ this.update('password') }></input>
                    </label>
                    <ul>
                        {errors}
                    </ul>
                    <button>{this.props.formType}</button>
                    </form>
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