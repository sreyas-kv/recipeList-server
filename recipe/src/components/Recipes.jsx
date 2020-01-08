import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipesList from './RecipesList';
import CreateRecipe from './CreateRecipe';
import ErrorMessage from './ErrorMessage';
import Header from './Header';
import '../styles/styles.css';
import '../styles/recipes.css';



export default class Recipes extends React.Component {

    state = { createRecipe: false };

    componentDidMount() {
        this.props.fetchAllRecipes();
    }

    recipeList = () => {
        const { allRecipes } = this.props;
        return (
            allRecipes.map(recipes => {
                return (
                    <li className="flex-list" key={recipes._id}>
                        <RecipesList recipes={recipes} />
                    </li>)
            })
        )
    }

    createRecipe = () => {
        this.setState({ createRecipe: true })
    }

    logout = () => {
        const { logout, history } = this.props;
        logout();
        return (history.push('/welcome'));
    }

    render() {
        console.log('Recipe Props: ', this.props)
        const { isAuthenticated, error } = this.props;
        const { createRecipe } = this.state;
        return (
            <React.Fragment>
                <div className="recipe-container">
                    <Header />
                    {
                        isAuthenticated ?
                            createRecipe ?
                                (<CreateRecipe />) :
                                (
                                    <div className="recipe-parent">
                                        {/* <div className="left-panel"> */}
                                            <div className="info">
                                                <Link className="create-recipe" to="/createRecipe">Create Recipe</Link>
                                                <button className="logout-button" onClick={this.logout}>Logout</button>
                                            </div>
                                        {/* </div> */}

                                        <div className="flex-div-container">
                                            <div className="recipe-ul-container">
                                                <ul className="recipe-list-ul">
                                                    {this.recipeList()}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="right-panel"> </div>
                                    </div>
                                )
                            :
                            <Redirect to="/welcome" />
                    }
                    <ErrorMessage error={error} />
                </div>
            </React.Fragment>

        )
    }
}


Recipes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fetchAllRecipes: PropTypes.func.isRequired,
    createReciepe: PropTypes.func.isRequired,
    fetchRecipe: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    createRecipe: PropTypes.object.isRequired,
    error: PropTypes.string,
};

