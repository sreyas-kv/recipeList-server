import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, Form } from 'redux-form';
import Input from './Input';
import { required, nonEmpty } from './validator';
import '../styles/createRecipe.css';


class CreateRecipe extends React.Component {
    onSubmit(values) {
        const { recipeName, ingeridents, cookingTime, directions } = values;
        const createMethod = { recipeName, ingeridents, cookingTime, directions };
        this.props.createRecipes(createMethod);

        this.props.history.push('/recipes');
    }

    renderField = ({ input, label, type, meta: { touched, error } }) =>
        <span className="addIngerident-span">
            <input {...input} type={type} placeholder={label} className="create-input" />
            {touched &&
                error &&
                <span>
                    {error}
                </span>}
        </span>

    renderIngerident = ({ fields, meta: { error } }) =>
        <div className="addIngredients-div">
            <button className="add-ingredients" type="button" onClick={() => fields.push()}>Add ingredient</button>
            {fields.map((ingerident, index) =>
                <div className="addOption-div" key={index}>
                    <Field
                        name={ingerident}
                        type="text"
                        component={this.renderField}
                        label={`Ingredient ${index + 1}`}
                    />
                    <button
                        type="button"
                        className="remove-ingredientd add-ingredients"
                        title="Remove ingerident"
                        onClick={() => fields.remove(index)}>Remove ingredient</button>
                </div>
            )}
            {error &&
                <li className="error">
                    {error}
                </li>}
        </div>

    renderDirections = ({ fields, meta: { error } }) =>
        <div className="addInstructions-div">
            <button className="add-ingredients" type="button" onClick={() => fields.push()}>Add steps</button>
            {fields.map((direction, index) =>
                <div className="fieldarray-container" key={index}>
                    <Field
                        className="create-input "
                        name={direction}
                        type="text"
                        component={this.renderField}
                        label={`Step ${index + 1}`}
                    />
                    <button
                        type="button"
                        className="add-ingredients"
                        title="Remove step"
                        onClick={() => fields.remove(index)}>Remove step</button>
                </div>
            )}
            {error &&
                <li className="error">
                    {error}
                </li>}
        </div>

    render() {
        return (
            <div className="parent">
                <div className="createRecipe-container">
                    <h2 className="create-heading">
                        Create Recipe
                        <button className="return-button" type="button" onClick={() => this.props.history.goBack()}>
                            X </button></h2>
                    <form
                        className="createRecipe-form"
                        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

                        <Field className="create-input" component={Input} type="text" name="recipeName" placeholder="Recipe name" validate={[required, nonEmpty]} />
                        <Field className="cooking-input" component={Input} type="text" name="cookingTime" id="cookingTime" placeholder="Cooking time" validate={[required, nonEmpty]} />
                        <div className="add-buttons">
                            <FieldArray className="add-ingredient" name="ingeridents" component={this.renderIngerident} />
                            <FieldArray name="directions" component={this.renderDirections} />
                        </div>
                        <button
                            type="submit"
                            className="done add-ingredients"
                            disabled={this.props.pristine || this.props.submitting}
                        > Done </button>

                        <button className="back add-ingredients" type="button" onClick={() => this.props.history.goBack()}>Go back</button>
                    </form>
                </div>
            </div>
        )
    }

}


CreateRecipe.propTypes = {
    createReciepe: PropTypes.func.isRequired,
}



export default reduxForm({
    form: 'createRecipe'
})(CreateRecipe);

