import io from 'socket.io-client';
import { take, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { JobsActions } from '../actions/socketActions';

export const socket = io.connect('/');

export const SocketEvents = {
  jobsFresh: 'jobs+fresh'
};

export function createFreshJobsChannel() {
  const subscribe = emitter => {
    socket.on(SocketEvents.jobsFresh, emitter);

    return () => socket.removeEventListener(SocketEvents.jobsFresh, emitter);
  };

  return eventChannel(subscribe);
}

export function* freshJobsSaga() {
  const channel = yield call(createFreshJobsChannel);

  while (true) {
    const jobs = yield take(channel);

    const action = JobsActions.fresh(jobs);

    yield put(action);
  }
}
