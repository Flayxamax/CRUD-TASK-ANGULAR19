import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      // REPLACE WITH YOUR FIREBASE CONFIG
      initializeApp({
        projectId: 'xxxxxxxxxxxxxxxxxxxxx',
        appId: 'xxxxxxxxxxxxxxxxxxxxxxx',
        storageBucket: 'xxxxxxxxxxxxxxxx',
        apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        authDomain: 'xxxxxxxxxxxxxxxxxxx',
        messagingSenderId: 'xxxxxxxxxxxx',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
