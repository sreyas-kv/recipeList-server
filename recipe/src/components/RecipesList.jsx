import React from 'react'
import { Link } from 'react-router-dom';


export default function RecipesList(props) {
    const { recipeName, cookingTime, directions, ingeridents } = props.recipes;

    return (
        <Link className="link" to={{
            pathname: '/recipeDetails',
            state: {
                recipeName: recipeName,
                cookingTime: cookingTime,
                directions: directions,
                ingeridents: ingeridents,
            }
        }}>
            <p className="recipe-title">{recipeName}</p>
            <p className="prep-time">Prepration Time: {cookingTime}</p>
        </ Link>
    )
}