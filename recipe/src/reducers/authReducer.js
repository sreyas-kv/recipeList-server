import * as types from '../constants';

const token = localStorage.getItem('token'); 

console.log('Reducer Auth', !!token)
const initialState = {
    isAuthenticated: !!token,
    user: null,
    token,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user.name,
                token: action.payload.token,
            };
        case types.RECIEVE_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.name,
            };
        case types.REGISTER_ERROR:
        case types.LOGIN_ERROR:
        case types.RECIEVE_AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: localStorage.removeItem('token')
            };
        default:
            return state;
    }
}