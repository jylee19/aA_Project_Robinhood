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
        this.beginDemo = this.beginDemo.bind(this);
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

    beginDemo(){
        this.setState({ username: 'demoUser', password: 'demoUser1' })
    }


        //     let demo = {
        //     username: 'demoUser',
        //     password: 'demoUser1'
        // }

    render() {
        let errors;
        if (this.props.errors) errors = this.props.errors.map(err => (<h2>{err}</h2>));
        return(
            <React.Fragment>
                <div className="split-screen">
                    <div id="split-left" >
                            <img className="login_pic" src={window.loginImage} alt="cannot display"/>
                    </div>

                    <div id="split-right">
                        <h1 id="login-title">Welcome to Robingoods</h1>
                        <br/>
                        <form className="login-form" onSubmit={ this.handleSubmit }>
                        <label id="login-user">Username
                            <br/>
                            <input id='un' type='text' value={ this.state.username } onChange={ this.handleChange }></input>
                        </label>
                        <br/>
                        <label id="password-user">Password
                            <br/>
                            <input id='pass' type='password' value={ this.state.password } onChange={ this.handleChange }></input>
                        <ul>
                            {errors}
                        </ul>
                        </label>
                        <br/>
                        <button id="login-button">Sign in</button>
                        <button id='demo-button' onClick={ this.beginDemo }>Try a Demo</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default LoginForm;