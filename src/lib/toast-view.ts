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
  styleUrls: ['./toast-view.component.css'],
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
