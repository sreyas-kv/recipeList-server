import { combineReducers } from 'redux';
import * as types from '../constants';

const intialState = {
  isFetching: {
    signup: false,
    login: false,
    recieveAuth: false,
    allRecipes: false,
    reciepe: false,
    selectRecipe: false,
    logout: false,
  },
  errors: {
    auth: null,
  }
};

export const isFetching = (state = intialState.isFetching, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return { ...state, signup: true };
    case types.LOGIN_REQUEST:
      return { ...state, login: true };
    case types.LOGOUT_REQUEST:
      return { ...state, logout: true };
    case types.RECIEVE_AUTH_REQUEST:
      return { ...state, recieveAuth: true };
    case types.FETCH_RECIPES_REQUEST:
      return { ...state, allRecipes: true };


    case types.REGISTER_SUCCESS:
    case types.REGISTER_ERROR:
      return { ...state, signup: false };
    case types.LOGIN_SUCCESS:
    case types.LOGIN_ERROR:
      return { ...state, login: false };
    case types.RECIEVE_AUTH_SUCCESS:
    case types.RECIEVE_AUTH_ERROR:
      return { ...state, recieveAuth: false };
    case types.FETCH_RECIPES_SUCCESS:
    case types.FETCH_RECIPES_ERROR:
      return { ...state, allRecipes: false };
    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
      return { ...state, logout: false };

    default:
      return state;
  }
};

export const errors = (state = intialState.errors, action) => {
  switch (action.type) {
    case types.REGISTER_ERROR:
    case types.LOGIN_ERROR:
    case types.LOGOUT_FAILURE:
      return { ...state, auth: action.payload };

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return { ...state, auth: null };

    case types.FETCH_RECIPES_ERROR:
    case types.FETCH_SELECTED_RECIPES_ERROR:
    case types.CREATE_RECIPES_ERROR:
      return { ...state, recipe: action.payload };

    case types.FETCH_RECIPES_SUCCESS:
    case types.FETCH_SELECTED_RECIPES_SUCCESS:
    case types.CREATE_RECIPES_SUCCESS:
      return { ...state, recipe: null }

    default:
      return state;
  }
};



export default combineReducers({
  isFetching,
  errors,
});
