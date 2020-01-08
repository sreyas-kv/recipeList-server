import * as types from '../constants/services';
import history from '../util/history';

export function redirect(to) {
  return (dispatch) => {
    history.push(to);
    dispatch({
      type: types.REDIRECT,
      payload: { to },
    });
  };
}
