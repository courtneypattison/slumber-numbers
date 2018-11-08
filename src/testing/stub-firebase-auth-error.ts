import * as firebase from 'firebase/app';

export const StubFirebaseAuthError: firebase.auth.Error = {
  code: 'auth/popup-closed-by-user',
  message: 'Window closed by the user without completing the sign in to the provider.'
};
