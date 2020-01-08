import React from 'react';
import { Field, FieldArray, reduxForm, Form } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input  {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderIngredients = ({ fields, meta: { error } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push()}>Add Ingredients</button>
        </li>
        {fields.map((ingerident, index) => (
            <li key={index}>
                <Field
                    name={ingerident}
                    type="text"
                    component={renderField}
                    label={`Ingerident ${index + 1}`}
                />
                <button
                    type="button"
                    title="Remove Ingerident"
                    onClick={() => fields.remove(index)}
                >X</button>
            </li>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

const renderDirections = ({ fields, meta: { error } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push()}>Add Directions</button>
        </li>
        {fields.map((directions, index) => (
            <li key={index}>
                <Field
                    name={directions}
                    type="text"
                    component={renderField}
                    label={`Step ${index + 1}`}
                />
                <button
                    type="button"
                    title="Remove step"
                    onClick={() => fields.remove(index)}
                >X</button>
            </li>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);


const onSubmit = (create, data) => {

    const { recipeName, ingeridents, cookingTime, directions } = data;
    const createMethod = { recipeName, ingeridents, cookingTime, directions };
    console.log(createMethod)
    // console.log('create', create);
    // this.history.push('/recipes');
}


const RecipeArrayForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit(value => onSubmit(value))}>
            <Field
                name="recipeName"
                type="text"
                component={renderField}
                label="Recipe name"
            />
            <Field
                name="duration"
                type="text"
                component={renderField}
                label="Cooking duration"
            />
            <FieldArray
                name="ingredients"
                component={renderIngredients}
            />
            <FieldArray
                name="directions"
                component={renderDirections}
            />
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'recipeArrays',
    validate,
})(RecipeArrayForm)