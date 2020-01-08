import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllRecipes, fetchRecipe } from '../actions/recipes';
import { logout } from '../actions/auth';
import Recipes from '../components/Recipes';

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    allRecipes: state.recipeReducer.allRecipes,
    createReciepes: state.createReciepes,
    error: state.error,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ fetchAllRecipes, fetchRecipe, logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);