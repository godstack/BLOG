// reply with a `pong` message by invoking `socket.emit('pong')`

import { apply } from 'redux-saga/effects';

export function* subscription(socket, aimUsername, authUsername) {
  yield apply(socket, socket.emit, ['subscription', aimUsername, authUsername]); // call `emit` as a method with `socket` as context
  // yield put(notifySuccess('Subscription'))
}

export function* customizeOwnRoom(socket, username) {
  yield apply(socket, socket.emit, ['customize own room', username]); // call `emit` as a method with `socket` as context
  // yield put(notifySuccess('Subscription'))
}
