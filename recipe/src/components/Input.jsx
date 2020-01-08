import React from 'react';

// import './input.css';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <span className="form-error"> {this.props.meta.error}</span>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta}</div>
            );
        }

        return ( 
          
            <span className="form-input">
                
                <input className={this.props.className}
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder}
                />
                <label className="label-input" htmlFor={this.props.input.name}>
                    {/* <div className="error-message"> */}
                   {/* <span className="error-span">{this.props.label}{error}{warning}</span> */}
                   {error}{warning}
                </label>
              
            </span>
        );
    }
}
