import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Tabs from './Tabs';
import Header from './Header';
import ErrorMessage from './ErrorMessage';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
        };
    }

    componentDidMount() {
        this.props.recieveAuth();
    }

    handleTabChange = (event, value) => {
        this.setState({ activeTab: value });
    }

    render() {
        const { signup, login, isAuthenticated, error } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/recipes" />;
        }

        return (
            <React.Fragment>
                <Header />
                {
                    isAuthenticated ?
                        <Redirect to="/recipes" /> :
                        (<Tabs>
                            <div label="Login"><Login onSubmit={login} /></div>
                            <div label="Signup"><Signup onSubmit={signup} /></div>
                        </Tabs>)

                }
                <ErrorMessage error={error} />
            </React.Fragment>
        )
    }
}

Welcome.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    recieveAuth: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
};

Welcome.defaultProps = {
    error: null,
};
