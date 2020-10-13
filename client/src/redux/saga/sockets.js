import { take, put, call, apply, delay, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { socket } from '../../index';
import { notifySuccess } from '../actions/toastrActions';

// const createWebSocketConnection = (url = '/') => {
//   return io(url);
// };
// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {
    const errorHandler = errorEvent => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason));
    };

    const subscriptionHandler = ({ subscriber, action }) => {
      console.log('here');
      console.log(`${subscriber} ${action} to you`);
      emit('kek');
    };

    // setup the subscription
    socket.on('subscription', subscriptionHandler);
    socket.on('error', errorHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('subscription', subscriptionHandler);
    };

    return unsubscribe;
  });
}

export function* watchOnPings() {
  // const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      console.log('in while');
      // An error from socketChannel will cause the saga jump to the catch block

      const payload = yield take(socketChannel);
      console.log('payload in while', payload);
      // yield put({ type: INCOMING_PONG_PAYLOAD, payload })
      // yield fork(pong, socket);
    } catch (err) {
      console.error('socket error:', err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}
