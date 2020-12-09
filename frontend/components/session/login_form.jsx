import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.id === 'un') {
            this.setState({ username: e.target.value })
        } else {
            this.setState({ password: e.target.value })           
        }
    }

    handleSubmit(e) {
        // debugger;
        e.preventDefault();
        // const user = Object.assign({}, this.state);
        this.props.processForm(this.state);
    }

    render() {
        let errors;
        if (this.props.errors) errors = this.props.errors.map(err => (<h2>{err}</h2>));
        return(
            <React.Fragment>

                <h1>Welcome to Robingoods</h1>
                <form onSubmit={ this.handleSubmit }>
                <label>Username:
                    <input id='un' type='text' value={ this.state.username } onChange={ this.handleChange }></input>
                </label>
                <label>Password:
                    <input id='pass' type='password' value={ this.state.password } onChange={ this.handleChange }></input>
                <ul>
                    {errors}
                </ul>
                </label>
                <button>Sign in</button>
                </form>
            </React.Fragment>
        )
    }

}

export default LoginForm;