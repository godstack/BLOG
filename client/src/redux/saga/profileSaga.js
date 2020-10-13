import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_DELETE_POST_FROM_PROFILE,
  REQUEST_FOLLOW_FROM_PROFILE,
  REQUEST_GET_PROFILE_INFO,
  REQUEST_GET_USER_POSTS,
  REQUEST_LIKE_FROM_PROFILE
} from '../types';
import axios from 'axios';
import {
  setProfileInfo,
  showProfileLoading,
  hideProfileLoading,
  setFollowers,
  setUserPosts,
  showPostsLoading,
  hidePostsLoading,
  updateProfilePost,
  removeProfilePost
} from '../actions/profileActions';
import { notifyError, notifySuccess } from '../actions/toastrActions';
import { subscription } from '../helperFunctions/emittingMessages';
import { socket } from '../../index';

function* workerGetProfileInfo({ payload: { username, currentPage } }) {
  try {
    yield put(showProfileLoading());
    const [userInfo, postsInfo] = yield all([
      call(axios.get, `/api/user/${username}/info`),
      call(axios.get, `/api/user/${username}/posts`, {
        params: { page: currentPage }
      })
    ]);

    yield put(setProfileInfo({ ...postsInfo.data, ...userInfo.data }));
    yield put(hideProfileLoading());
  } catch (e) {
    yield put(
      notifyError(
        'Profile info',
        e?.response?.data?.message || 'Profile info fetching was failed'
      )
    );
    yield put(hideProfileLoading());
  }
}

function* workerFollow({ payload: { aimUsername, authUserId } }) {
  try {
    const authUsername = yield select(state => state.session.user.username);

    yield put(setFollowers(authUserId));

    yield call(axios.put, `/api/user/${aimUsername}/follow`);

    yield fork(subscription, socket, aimUsername, authUsername);
  } catch (e) {
    yield put(
      notifyError(
        'Follow',
        e?.response?.data?.message || 'Follow request was failed'
      )
    );
    yield put(setFollowers(authUserId));
  }
}

function* workerGetUserPosts({ payload: { username, currentPage } }) {
  try {
    yield put(showPostsLoading());

    const response = yield call(axios.get, `/api/user/${username}/posts`, {
      params: { page: currentPage }
    });

    yield put(setUserPosts(response.data.posts));

    yield put(hidePostsLoading());
  } catch (e) {
    yield put(
      notifyError(
        'User posts',
        e?.response?.data?.message || 'User posts fetching was failed'
      )
    );
    yield put(hidePostsLoading());
  }
}

function* workerLikePost({ payload: { postId, userId } }) {
  try {
    yield put(updateProfilePost(postId, userId));

    const response = yield call(axios.put, `/api/post/${postId}/like`);

    console.log(response);
  } catch (e) {
    yield put(
      notifyError(
        'Like post',
        e?.response?.data?.message || 'Like request was failed'
      )
    );
    yield put(updateProfilePost(postId, userId));
  }
}

function* workerDeletePost({ payload: postId }) {
  try {
    yield put(showPostsLoading());
    const response = yield call(axios.delete, `/api/post/${postId}`);
    yield put(removeProfilePost(response.data.postId));
    yield put(hidePostsLoading());
    yield put(notifySuccess('Post', 'Deleted successfully'));
  } catch (e) {
    yield put(hidePostsLoading());
    yield put(
      notifyError('Post', e?.response?.data?.message || 'Failed to delete post')
    );
  }
}

export function* profileSaga() {
  yield takeEvery(REQUEST_GET_PROFILE_INFO, workerGetProfileInfo);
  yield takeEvery(REQUEST_GET_USER_POSTS, workerGetUserPosts);
  yield takeEvery(REQUEST_FOLLOW_FROM_PROFILE, workerFollow);
  yield takeEvery(REQUEST_LIKE_FROM_PROFILE, workerLikePost);
  yield takeEvery(REQUEST_DELETE_POST_FROM_PROFILE, workerDeletePost);
}
