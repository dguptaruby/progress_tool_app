import './polyfills.ts';

import {enableProdMode} from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


document.addEventListener('DOMContentLoaded', () => {
  enableProdMode();
  platformBrowserDynamic().bootstrapModule(AppModule);
});
