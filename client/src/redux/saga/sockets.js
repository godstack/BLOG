import { take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { socket, store } from '../../index';
import { notifyWarning, notifySuccess } from '../actions/toastrActions';
import {
  addHomePost,
  removeHomePost,
  updateEditedHomePost
} from '../actions/homePageActions';

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

    const editPostHandler = post => {
      console.log('on edit post listen', post);
      store.dispatch(updateEditedHomePost(post));
    };

    const deletePostHandler = postId => {
      console.log('on delete post listen', postId);
      store.dispatch(removeHomePost(postId));
    };

    const addPostHandler = post => {
      console.log('on add post listen', post);
      store.dispatch(addHomePost(post));
    };

    const subscriptionHandler = (username, type) => {
      if (type === 'follow') {
        store.dispatch(
          notifySuccess('Subscription', `${username} subscribed to you`)
        );
      } else if (type === 'unfollow') {
        store.dispatch(
          notifyWarning('Unsubscription', `${username} unsubscribed from you`)
        );
      }
    };

    // setup the subscription
    socket.on('subscription', subscriptionHandler);
    socket.on('add post', addPostHandler);
    socket.on('delete post', deletePostHandler);
    socket.on('edit post', editPostHandler);
    socket.on('error', errorHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('subscription', subscriptionHandler);
      socket.off('add post', addPostHandler);
      socket.off('delete post', deletePostHandler);
      socket.off('edit post', editPostHandler);
    };

    return unsubscribe;
  });
}

export function* watchOnPings() {
  // const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block

      yield take(socketChannel);
    } catch (err) {
      console.error('socket error:', err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}
