import { actions as toastrActions } from 'react-redux-toastr';

// Base
export const notifyAlert = (
  type = 'info',
  title = 'Info',
  message = 'Just inform you :)'
) => toastrActions.add({ type, title, message });

// instances of base notifier
export const notifySuccess = (title, message) =>
  notifyAlert('success', title, message);
export const notifyError = (title, message) =>
  notifyAlert('error', title, message);
export const notifyWarning = (title, message) =>
  notifyAlert('warning', title, message);
