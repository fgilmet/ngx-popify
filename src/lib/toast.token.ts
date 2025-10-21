import { InjectionToken } from '@angular/core';
import { ToastOptions } from './toast.model';

export const POPIFY_BASE_OPTIONS: Required<ToastOptions> = {
  header: undefined,
  duration: 3000,
  position: 'top-right',
  showProgress: false,
  fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  showIcons: true,
  closable: false,
};

export const POPIFY_DEFAULT_OPTIONS = new InjectionToken<ToastOptions>(
  'POPIFY_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: () => POPIFY_BASE_OPTIONS,
  }
);
