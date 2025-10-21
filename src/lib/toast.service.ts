import { inject, Injectable, signal } from '@angular/core';
import { Toast, ToastType, ToastOptions } from './toast.model';
import {
  POPIFY_BASE_OPTIONS,
  POPIFY_DEFAULT_OPTIONS,
} from './toast.token';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private defaultOptions: ToastOptions = { ...POPIFY_BASE_OPTIONS };

  private readonly injectedDefaults = inject(POPIFY_DEFAULT_OPTIONS, {
    optional: true,
  });

  constructor() {
    if (this.injectedDefaults) {
      this.setDefaultOptions(this.injectedDefaults);
    }
  }

  setDefaultOptions(options: ToastOptions) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private addToast(type: ToastType, message: string, options?: ToastOptions) {
    const finalOptions = { ...this.defaultOptions, ...options };
    const toast: Toast = {
      id: this.generateId(),
      type,
      header: finalOptions.header,
      message,
      duration: finalOptions.duration,
      position: finalOptions.position,
      showProgress: finalOptions.showProgress,
      fontFamily: finalOptions.fontFamily,
      showIcons: finalOptions.showIcons,
      closable: finalOptions.closable,
    };
    this._toasts.set([...this._toasts(), toast]);

    if (typeof toast.duration === 'number' && toast.duration > 0) {
      setTimeout(() => {
        this._toasts.update((list) => list.filter((t) => t.id !== toast.id));
      }, toast.duration);
    }
  }

  dismiss(id: Toast['id']) {
    this._toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  success(msg: string, options?: ToastOptions) {
    this.addToast('success', msg, options);
  }
  info(msg: string, options?: ToastOptions) {
    this.addToast('info', msg, options);
  }
  warning(msg: string, options?: ToastOptions) {
    this.addToast('warning', msg, options);
  }
  error(msg: string, options?: ToastOptions) {
    this.addToast('error', msg, options);
  }
}
