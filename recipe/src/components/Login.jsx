import React from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css';

export default class Login extends React.Component {

    state = {
        username: {
            value: '',
            isValid: true,
        },
        password: {
            value: '',
            isValid: true,
        },
        isDisabled: true,
    };

    handleInputChange = event => {
        event.persist();
        const { name, value } = event.target;
        this.setState(prevState => ({
            [name]: {
                ...prevState[name],
                value,
            },
        }));
    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        this.props.onSubmit(username.value, password.value);
    };

    render() {
        const { username, password } = this.state;
        return (
            <div className="login-parent">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input
                        className="login-input"
                        type="text"
                        name="username"
                        placeholder="Email"
                        value={username.value}
                        onChange={this.handleInputChange} />
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password.value}
                        onChange={this.handleInputChange}
                    />
                    <button
                        className="button-color"
                        type="submit"
                    >Login</button>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}