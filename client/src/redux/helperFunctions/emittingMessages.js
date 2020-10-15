// reply with a `pong` message by invoking `socket.emit('pong')`

import { apply } from 'redux-saga/effects';
import { socket } from '../..';

export function* subscription(socket, aimUsername, authUsername, type) {
  yield apply(socket, socket.emit, [
    'subscription',
    aimUsername,
    authUsername,
    type
  ]); // call `emit` as a method with `socket` as context
}

export function* customizeOwnRoom(socket, username) {
  yield apply(socket, socket.emit, ['customize own room', username]); // call `emit` as a method with `socket` as context
}

export function* addPost(socket, post) {
  yield apply(socket, socket.emit, ['add post', post]); // call `emit` as a method with `socket` as context
}

export function* deletePost(socket, postId) {
  yield apply(socket, socket.emit, ['delete post', postId]); // call `emit` as a method with `socket` as context
}

export function* editPost(socket, post) {
  yield apply(socket, socket.emit, ['edit post', post]); // call `emit` as a method with `socket` as context
}
