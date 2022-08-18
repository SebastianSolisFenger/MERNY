import * as UserApi from '../api/UserRequest.js';

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPDATING_START' });

  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: 'UPDATING_SUCCESS', data: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'UPDATING_FAIL' });
  }
};
