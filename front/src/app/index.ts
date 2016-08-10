import {NgRedux} from "ng2-redux/lib/index";
export * from './app.component';
import {Logger} from "angular2-logger/core";

// Application wide providers
export const APP_PROVIDERS = [
  NgRedux, Logger
];
