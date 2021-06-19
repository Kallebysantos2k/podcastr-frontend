import { store } from 'react-notifications-component';

export interface NotificationData {
  title: string,
  message: string,
  duration?: number,
}

const DEFAULT_NOTIFICATION_TIME = 5000; // 5 seconds

export function displaySuccessNotification({
  title, message, duration = DEFAULT_NOTIFICATION_TIME,
}: NotificationData) {
  return store.addNotification({
    title,
    message,
    type: 'success',
    container: 'top-left',
    dismiss: {
      duration,
    },
  });
}

export function displayInfoNotification({
  title, message, duration = DEFAULT_NOTIFICATION_TIME,
}: NotificationData) {
  return store.addNotification({
    title,
    message,
    type: 'default',
    container: 'top-left',
    dismiss: {
      duration,
    },
  });
}

export function displayErrorNotification({
  title, message, duration = DEFAULT_NOTIFICATION_TIME,
}: NotificationData) {
  return store.addNotification({
    title,
    message,
    type: 'danger',
    container: 'top-left',
    dismiss: {
      duration,
    },
  });
}
