import { FirebaseError } from 'firebase/app';

export const StubFirebaseError: FirebaseError = {
  code: 'auth/requires-recent-login',
  message: 'The user needs to have recently logged in',
  stack: 'stack',
  name: 'FirebaseError',
};
