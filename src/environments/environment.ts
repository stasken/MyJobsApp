// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://localhost:44321/api/",

  storage: {
    FIRSTTIME_KEY: "firstTime",
    POSTREQUESTS_KEY: "local_postrequests",
    SUBSCRIPTION_KEY: "sub_id",
    AUTH_KEY: "auth_vars",
    AUTH_TOKEN: "token",
  },
  notifications: {
    VAPID_PUBLIC_KEY:
      "BMQ1bPCB3GNVTwKy_209sTu3OnOYR31x3RrUeu2CzodG_pRuuxZWuahovYamcGkyZPPKfxXJ5bIc921WUzpa1zo",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
