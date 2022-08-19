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

// FOLLOW USER
export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'FOLLOW_USER' });

  UserApi.followUser(id, data);
};

// UNFOLLOW USER

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'UNFOLLOW_USER' });

  UserApi.unfollowUser(id, data);
};
