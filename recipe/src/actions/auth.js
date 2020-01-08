import * as types from '../constants/authConstant';
import callApi from '../util/call-api';


export function signup(name, email, password) {
    return (dispatch, getState) => {
        const { isFetching } = getState().services; //Services is from reducer

        if (isFetching.signup) {
            return Promise.resolve();
        }

        dispatch({
            type: types.REGISTER_REQUEST,
        });

        return callApi(
            '/signup',
            undefined,
            { method: 'POST' },
            { name, email, password },
        )
            .then((response) => {
                if (!response.token) {
                    throw new Error('Token has not been provided!');
                }

                //save JWT to localStorage
                localStorage.setItem('token', response.token);
                dispatch({
                    type: types.REGISTER_SUCCESS,
                    payload: response,
                });
            })
            .catch(reason => dispatch({
                type: types.REGISTER_ERROR,
                payload: reason,
            }));
    };
}


export function login(email, password) {
    return (dispatch, getState) => {
        const { isFetching } = getState().services;

        if (isFetching.log) {
            return Promise.resolve();
        }
        dispatch({
            type: types.LOGIN_REQUEST,
        });

        return callApi(
            '/login',
            undefined,
            { method: 'POST' },
            { email, password },
        )
            .then((response) => {
                if (!response.token) {
                    throw new Error('Token has not been provided for Login!');
                }
                localStorage.setItem('token', response.token);

                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: response,
                });
            })
            .catch(error => dispatch({
                type: types.LOGIN_ERROR,
                payload: error,
            }));
    };
}

export function recieveAuth() {
    return (dispatch, getState) => {
        const { token } = getState().authReducer;
        if (token) {
            dispatch({
                type: types.RECIEVE_AUTH_REQUEST,
            });
            return callApi('/users/me')
                .then(response => dispatch({
                    type: types.RECIEVE_AUTH_SUCCESS,
                    payload: response,
                }))
                .catch(error =>
                    dispatch({
                        type: types.RECIEVE_AUTH_ERROR,
                        payload: error,
                    }));
        }
    }
}

export function logout() {
    return (dispatch, getState) => {
      const { isFetching } = getState().services;
  
      if (isFetching.logout) {
        return Promise.resolve();
      }
  
      dispatch({
        type: types.LOGOUT_REQUEST,
      });
  
      return callApi('/logout')
        .then((json) => {
          // Remove JWT from localStorage
        //   localStorage.removeItem('token');
  
          // redirect to welcome in case of failure
          dispatch({
            type: types.LOGOUT_SUCCESS,
            payload: json,
          });
        })
        .catch(reason =>
          dispatch({
            type: types.LOGOUT_FAILURE,
            payload: reason,
          }));
    };
  }