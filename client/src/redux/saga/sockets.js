import { take, put, call, apply, delay, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import { notifySuccess } from '../actions/toastrActions';

const createWebSocketConnection = (url = '/') => {
  return io(url);
};
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

// reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket, username) {
  console.log(socket);
  console.log('id', socket.id);
  yield apply(socket, socket.emit, [
    'subscription',
    socket.id,
    username,
    'subscribe'
  ]); // call `emit` as a method with `socket` as context
  // yield put(notifySuccess('Subscription'))
}

export function* watchOnPings() {
  const socket = yield call(createWebSocketConnection);

  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(pong, socket, 'godlexa');

  while (true) {
    try {
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
