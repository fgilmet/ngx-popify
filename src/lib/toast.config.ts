import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { ToastOptions } from './toast.model';
import { ToastService } from './toast.service';
import {
  POPIFY_BASE_OPTIONS,
  POPIFY_DEFAULT_OPTIONS,
} from './toast.token';

export function provideToastConfig(
  options: ToastOptions = {}
): EnvironmentProviders {
  const resolved = { ...POPIFY_BASE_OPTIONS, ...options };

  return makeEnvironmentProviders([
    {
      provide: POPIFY_DEFAULT_OPTIONS,
      useValue: resolved,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => () => inject(ToastService).setDefaultOptions(resolved),
    },
  ]);
}
