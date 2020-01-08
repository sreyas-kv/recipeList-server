import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorMessage extends React.Component {

    state = { open: !!this.props.error };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ open: true });
        }
    }

    render() {
        const { error } = this.props;

        return (
            <div>
                {
                    error ?
                        (<div> Something Went wrong! </div>) :
                        ''
                }
            </div>
        )
    }

}


ErrorMessage.propTypes = {
    error: PropTypes.instanceOf(Error),
};

ErrorMessage.defaultProps = {
    error: null,
};