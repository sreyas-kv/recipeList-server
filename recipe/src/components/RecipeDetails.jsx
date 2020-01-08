import React from 'react';
import '../styles/selectedRecipe.css';

const RecipeDetails = (props) => {
    const { recipeName, cookingTime, directions, ingeridents } = props.location.state;
    const direction = () => directions.map(direction => <li>{direction}</li>);
    const ingerident = () => ingeridents.map(ingerident => <li>{ingerident}</li>);
    const goBack = () => props.history.push('/recipes');

    return (
        <div className="parent">
            <div className="selected-contianer">
                <div className="selected-child">
                    <h2 className="selected-heading"><button className="return-button" onClick={goBack}> X </button>{recipeName}</h2>
                    <div className="selected-subitems">
                        <p className="prep-time">Prepration time: {cookingTime}</p>
                        <p className="selected-ingeridents">Ingeridents:</p>
                        <ol className="selected-ol">{ingerident()}</ol>
                        <p className="directions">Directions: </p>
                        <ol className="selected-ol-direction">{direction()}</ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails;