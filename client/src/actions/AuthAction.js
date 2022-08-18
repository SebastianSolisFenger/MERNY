import * as AuthApi from '../api/AuthRequest';

// LOGIN ACTION

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });

  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: 'AUTH_SUCCESS', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};

// SIGNUP ACTION

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });

  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: 'AUTH_SUCCESS ', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};

// LOGOUT ACTION

export const logOut = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' });
};
