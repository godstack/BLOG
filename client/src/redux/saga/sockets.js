import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { socket } from '../../index';

export function createChannel() {
  const subscribe = emit => {
    socket.emit('message', 'from saga channel');
  };

  return eventChannel(subscribe);
}

export function* freshChannelSaga() {
  const channel = yield call(createChannel);

  // while(true){
  //   const jobs = yield take()
  // }
}
