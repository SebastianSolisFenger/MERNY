import * as AuthApi from '../api/AuthRequest';

// LOGIN ACTION

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });

  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: 'AUTH_SUCCESS ', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};

// SIGNUP ACTION

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'SIGNUP_START' });

  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: 'AUTH_SUCCESS ', data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};
