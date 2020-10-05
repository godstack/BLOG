import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_UPDATE_USER_INFO_FROM_SETTINGS,
  REQUEST_USER_INFO_FOR_PROFILE_SETTINGS
} from '../types';
import axios from 'axios';
import { setUserInfoForProfileSettings } from '../actions/settingsActions';
import { notifyError, notifySuccess } from '../actions/toastrActions';

function* workerSetUserInfoForSettings() {
  try {
    const response = yield call(axios.get, '/api/settings/profile');

    yield put(setUserInfoForProfileSettings(response.data.user));
  } catch (e) {
    yield put(
      notifyError(
        'User info',
        e?.response?.data?.message ||
          'Fetching user info for settings was failed'
      )
    );
  }
}

function* workerUpdateUserInfo({ payload: formData }) {
  try {
    yield call(axios.put, '/api/settings/profile', formData);
    yield put(
      notifySuccess('Profile info', 'Profile info updated successfully')
    );
  } catch (e) {
    yield put(
      notifyError(
        'Update profile info',
        e?.response?.data?.message || 'Updating profile info was failed'
      )
    );
  }
}

export function* settingsSaga() {
  yield takeEvery(
    REQUEST_USER_INFO_FOR_PROFILE_SETTINGS,
    workerSetUserInfoForSettings
  );

  yield takeEvery(REQUEST_UPDATE_USER_INFO_FROM_SETTINGS, workerUpdateUserInfo);
}
