export type ToastType = 'success' | 'info' | 'warning' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  header?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
  showProgress?: boolean;
  fontFamily?: string;
  showIcons?: boolean;
  closable?: boolean;
}

export interface ToastOptions {
  header?: string;
  duration?: number;
  position?: ToastPosition;
  showProgress?: boolean;
  fontFamily?: string;
  showIcons?: boolean;
  closable?: boolean;
}
