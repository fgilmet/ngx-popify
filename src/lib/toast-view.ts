import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matCheckCircleOutline,
  matErrorOutline,
  matInfoOutline,
  matNotificationsOutline,
  matWarningOutline,
} from '@ng-icons/material-icons/outline';
import { ToastService } from './toast.service';
import { Toast } from './toast.model';

@Component({
  selector: 'toast-view',
  standalone: true,
  imports: [NgClass, NgIconComponent],
  providers: [
    provideIcons({
      matCheckCircleOutline,
      matErrorOutline,
      matInfoOutline,
      matNotificationsOutline,
      matWarningOutline,
    }),
  ],
  template: `
    @for (pos of positions; track pos) {
      <div class="toast-view" [ngClass]="pos">
        @for (toast of getFilteredToasts(pos); track toast.id) {
          <div
            class="toast"
            [class]="toast.type"
            [style.fontFamily]="toast.fontFamily || null"
          >
            <div class="toast-body">
              @if (shouldShowIcons(toast)) {
                <div class="toast-icon" aria-hidden="true">
                  <ng-icon [name]="iconForToast(toast.type)"></ng-icon>
                </div>
              }
              <div class="toast-content">
                @if (toast.header) {
                  <p class="toast-title">{{ toast.header }}</p>
                }
                <p class="toast-message">{{ toast.message }}</p>
              </div>
              @if (toast.closable) {
                <button
                  type="button"
                  class="toast-close"
                  aria-label="Dismiss notification"
                  (click)="closeToast(toast.id)"
                >
                  &times;
                </button>
              }
            </div>
            @if (toast.showProgress && toast.duration) {
              <span
                class="toast-progress"
                [style.animationDuration]="animationDuration(toast.duration)"
              ></span>
            }
          </div>
        }
      </div>
    }
  `,
  styles: [
    `
      .toast-view {
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        z-index: 9999;
      }

      .top-right {
        top: 1rem;
        right: 1rem;
        align-items: flex-end;
      }
      .top-left {
        top: 1rem;
        left: 1rem;
        align-items: flex-start;
      }
      .bottom-right {
        bottom: 1rem;
        right: 1rem;
        align-items: flex-end;
      }
      .bottom-left {
        bottom: 1rem;
        left: 1rem;
        align-items: flex-start;
      }
      .top-center {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
      }
      .bottom-center {
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
      }

      .toast {
        width: min(400px, calc(100vw - 2rem));
        min-width: 260px;
        min-height: 65px;
        padding: 1rem;
        position: relative;
        border-radius: 8px;
        border: 1px solid var(--toast-border, #e2e8f0);
        background-color: var(--toast-bg, #f8fafc);
        color: var(--toast-text, #0f172a);
        box-shadow: 0 16px 32px -18px rgba(15, 23, 42, 0.35);
        opacity: 0;
        transform: translateY(12px);
        animation: fadeInUp 0.3s ease forwards;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        text-align: left;
        font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      }

      .toast.success {
        --toast-base: #10b981;
        --toast-bg: #ecfdf5;
        --toast-border: #a7f3d0;
        --toast-text: #022c22;
        --toast-text-secondary: #047857;
      }
      .toast.info {
        --toast-base: #3b82f6;
        --toast-bg: #eff6ff;
        --toast-border: #bfdbfe;
        --toast-text: #1e3a8a;
        --toast-text-secondary: #1d4ed8;
      }
      .toast.warning {
        --toast-base: #f59e0b;
        --toast-bg: #fffbeb;
        --toast-border: #fde68a;
        --toast-text: #78350f;
        --toast-text-secondary: #b45309;
      }
      .toast.error {
        --toast-base: #ef4444;
        --toast-bg: #fef2f2;
        --toast-border: #fecaca;
        --toast-text: #7f1d1d;
        --toast-text-secondary: #b91c1c;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .toast-content {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        flex: 1 1 auto;
      }

      .toast-body {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .toast-icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--toast-base, #38bdf8);
        color: var(--toast-bg, #f8fafc);
        flex-shrink: 0;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.45);
      }

      .toast-icon ng-icon {
        width: 1.5rem;
        height: 1.5rem;
      }

      .toast-close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border: none;
        background: transparent;
        color: var(--toast-text-secondary, #475569);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        line-height: 1;
        font-size: 1.25rem;
      }

      .toast-close:hover {
        color: var(--toast-text, #0f172a);
      }

      .toast-close:focus-visible {
        outline: 2px solid var(--toast-base, #38bdf8);
        outline-offset: 2px;
      }

      .toast-title {
        margin: 0;
        font-weight: 600;
        font-size: 1.05rem;
        color: var(--toast-text, #0f172a);
      }

      .toast-message {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--toast-text-secondary, #475569);
      }

      .toast-progress {
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 999px;
        background-color: var(--toast-base, #38bdf8);
        transform-origin: left;
        animation-name: toast-progress-deplete;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        margin-top: auto;
      }

      @keyframes toast-progress-deplete {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(0);
        }
      }
    `,
  ],
})
export class ToastView {
  private readonly service = inject(ToastService);
  private readonly iconMap: Record<Toast['type'], string> = {
    success: 'matCheckCircleOutline',
    info: 'matInfoOutline',
    warning: 'matWarningOutline',
    error: 'matErrorOutline',
  };
  private readonly fallbackIcon = 'matNotificationsOutline';
  readonly toasts = computed(() => this.service.toasts());
  readonly positions = [
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-center',
    'bottom-center',
  ];

  getFilteredToasts(pos: string) {
    const current = this.toasts();

    return Array.isArray(current)
      ? current.filter((toast: Toast) => toast.position === pos)
      : [];
  }

  animationDuration(duration?: number) {
    return typeof duration === 'number' ? `${duration}ms` : undefined;
  }

  shouldShowIcons(toast: Toast) {
    return toast.showIcons ?? true;
  }

  iconForToast(type: Toast['type']) {
    return this.iconMap[type] ?? this.fallbackIcon;
  }

  closeToast(id: Toast['id']) {
    this.service.dismiss(id);
  }
}
