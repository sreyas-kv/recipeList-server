import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import services from './services';
import recipeReducer from './recipeReducer';

export default combineReducers({
    authReducer,
    services,
    recipeReducer,
    form: reduxFormReducer,
});

export const getUserId = user => user._id;
export const getActiveUser = state => state.authReducer.user;