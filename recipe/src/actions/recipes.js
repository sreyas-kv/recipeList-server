import * as types from '../constants/recipesConstant';
import callApi from '../util/call-api';
import { redirect } from './services';

export function fetchAllRecipes() {
    return (dispatch, getState) => {
        const state = getState();
        const { isFetching } = state.services;
        const token = state.auth;

        if (isFetching.allRecipes) {
            return Promise.resolve();
        }
        dispatch({
            type: types.FETCH_RECIPES_REQUEST,
        });

        return callApi('/recipe', token)
            .then(data =>
                dispatch({
                    type: types.FETCH_RECIPES_SUCCESS,
                    payload: data,
                }))
            .catch(error =>
                dispatch({
                    type: types.FETCH_RECIPES_ERROR,
                    payload: error
                }));
    };
}

export function createRecipes(recipe) {

    return (dispatch, getState) => {
        const state = getState();
        const { isFetching } = state.services;
        const { token } = state.auth || '';

        if (isFetching.reciepe) {
            return Promise.resolve();
        }

        dispatch({
            type: types.CREATE_RECIPES_REQUEST,
            payload: recipe,
        });

        // return callApi('/recipe', token)

        return callApi(
            '/recipe',
            token,
            { method: 'POST' },
            recipe
        )
            .then(({ recipe }) => {
                dispatch({
                    type: types.CREATE_RECIPES_SUCCESS,
                    payload: recipe,
                });
                return recipe;
            })
            .catch(error =>
                dispatch({
                    type: types.CREATE_RECIPES_ERROR,
                    payload: error,
                }));
    };
}

export function fetchRecipe(recipeId) {
    return (dispatch, getState) => {
        const state = getState();
        const { isFetching } = state.services;
        const { token } = state.auth;

        if (isFetching.selectRecipe) {
            return Promise.resolve();
        }

        dispatch({
            type: types.FETCH_SELECTED_RECIPES_REQUEST,
        });

        return callApi(`/recipe/${recipeId}`, token)
            .then((data) => {
                dispatch({
                    type: types.FETCH_SELECTED_RECIPES_SUCCESS,
                    payload: data,
                });
                return data;
            })
            .catch((error) => {
                dispatch({
                    type: types.FETCH_SELECTED_RECIPES_ERROR,
                    payload: error,
                });

                dispatch(redirect('/recipes'));
            });
    };
}