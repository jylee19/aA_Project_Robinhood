import React from 'react';
import { Link } from 'react-router-dom';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.id === 'un') {
            this.setState({ username: e.target.value })
        } else if (e.target.id === 'pass') {
            this.setState({ password: e.target.value })           
        } else {
            this.setState({ email: e.target.value })
        }
    }

    handleSubmit(e) {
        // debugger;
        e.preventDefault();
        // const user = Object.assign({}, this.state);
        this.props.action(this.state);
    }

    render() {
        let errors;
        if (this.props.errors) errors = this.props.errors.map(err => (<h2>{err}</h2>));
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
                        <input id='email' type='text' value={ this.state.email } onChange={ this.handleChange }></input>
                    </label>                
                    <label>Username:
                        <input id='un' type='text' value={ this.state.username } onChange={ this.handleChange }></input>
                    </label>
                    <label>Password:
                        <input id='pass' type='password' value={ this.state.password } onChange={ this.handleChange }></input>
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
                        <input id='email' type='text' value={ this.props.user.email } onChange={ this.handleChange }></input>
                    </label>                
                    <label>Username:
                        <input id='un' type='text' value={ this.props.user.username } onChange={ this.handleChange }></input>
                    </label>
                    <label>Password:
                        <input id='pass' type='password' value={ this.props.user.password } onChange={ this.handleChange }></input>
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