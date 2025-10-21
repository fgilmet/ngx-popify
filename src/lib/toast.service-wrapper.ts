import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastOptions } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastServiceWrapper {
  constructor(private service: ToastService) {}

  success(msg: string, options?: ToastOptions) {
    this.service.success(msg, options);
  }

  info(msg: string, options?: ToastOptions) {
    this.service.info(msg, options);
  }

  warning(msg: string, options?: ToastOptions) {
    this.service.warning(msg, options);
  }

  error(msg: string, options?: ToastOptions) {
    this.service.error(msg, options);
  }
}
