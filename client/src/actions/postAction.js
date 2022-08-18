import * as PostApi from '../api/PostRequest';

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'RETREIVING_START' });

  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: 'RETREIVING_SUCCESS', data: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'RETREIVING_FAIL' });
  }
};
