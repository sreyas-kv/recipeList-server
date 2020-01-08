import * as types from '../constants';

const initialState = {
    allRecipes: [],
    createRecipe: [],
    error: ','
}

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_RECIPES_SUCCESS:
        case types.FETCH_SELECTED_RECIPES_SUCCESS:
            return {
                ...state,
                allRecipes: action.payload.recipes,
            };

        case types.CREATE_RECIPES_SUCCESS:
            return Object.assign({}, state, {
                createRecipe: [...state.createRecipe]
            })

        case types.CREATE_RECIPES_ERROR:
        case types.FETCH_SELECTED_RECIPES_ERROR:
        case types.FETCH_RECIPES_ERROR:
            return {
                ...state,
                error: action.payload.error,
            }

        default:
            return state;
    }
}

export default recipeReducer;