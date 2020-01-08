import React from 'react';
import '../styles/login.css';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                isValid: true,
            },
            email: {
                value: '',
                isValid: true,
            },
            password: {
                value: '',
                isValid: true,
            },
            repeatPassword: {
                value: '',
                isValid: true,
            },
        };
    }

    validate = () => {
        const { password, repeatPassword } = this.state;
        const isValid = password.value === repeatPassword.value;

        this.setState({
            password: { ...password, isValid },
            repeatPassword: { ...repeatPassword, isValid },
        });
        return isValid;
    };

    handleInputChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        this.setState(prevState => ({
            [name]: {
                ...prevState[name],
                value,
            },
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.validate()) {
            return;
        }

        const { email, password, name } = this.state;
        this.props.onSubmit(name.value, email.value, password.value);
    };

    render() {
        const { email, name, password, repeatPassword } = this.state;
        return (
            // <div className="signup-form-container">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    {/* <p className="p-label">Name: */}
                    <input
                        className="login-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name.value}
                        onChange={this.handleInputChange} />

                    {/* </p> */}
                    {/* <p className="p-label">Email: */}
                    <input
                        className="login-input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email.value}
                        onChange={this.handleInputChange}
                    />
                    {/* </p> */}
                    {/* <p className="p-label">Password: */}
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password.value}
                        onChange={this.handleInputChange}
                    />
                    {/* </p> */}
                    {/* <p className="p-label">Confirm Password */}
                    <input
                        className="login-input"
                        type="password"
                        name="repeatPassword"
                        placeholder="Confirm password"
                        value={repeatPassword.value}
                        onChange={this.handleInputChange}
                    />
                    {/* </p> */}
                    <button className="signup-button-color">Signup</button>
                </form>
            // </div>
        )
    }
}
