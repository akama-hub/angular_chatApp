// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // 取得したFirebaseの情報を設定してください
  firebase: {
    apiKey: "AIzaSyA2HQo3J50xsB7_Y-lbKtWc6j01Ew8UcQQ",
    authDomain: "chat-99479.firebaseapp.com",
    projectId: "chat-99479",
    storageBucket: "chat-99479.appspot.com",
    messagingSenderId: "361576479992",
    appId: "1:361576479992:web:56c7685d9828a87c408f0d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
