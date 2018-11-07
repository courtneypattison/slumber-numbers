import { firestore } from 'firebase/app';

export const StubFirestoreError: firestore.FirestoreError = {
  code: 'permission-denied',
  message: 'Missing or insufficient permissions.',
  stack: 'stack',
  name: 'FirebaseError',
};
