// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDs6BRPFCLnYzdk389HQY2xNJL-siBGEPQ',
    authDomain: 'slumbernumbers.com',
    databaseURL: 'https://slumber-numbers.firebaseio.com',
    projectId: 'slumber-numbers',
    storageBucket: 'slumber-numbers.appspot.com',
    messagingSenderId: '583619848210'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
