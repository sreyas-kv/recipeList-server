import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRecipes } from '../actions/recipes';
import CreateRecipe from '../components/CreateRecipe';

const mapStateToProps = state => ({
    allRecipes: state.recipeReducer.allRecipes,
    createReciepes: state.createReciepes,
    error: state.error,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ createRecipes }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);

