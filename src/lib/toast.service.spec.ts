import { TestBed } from '@angular/core/testing';
import { provideToastConfig } from './toast.config';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('uses built-in defaults when no config is provided', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ToastService);

    service.success('Hello world');
    const toast = service.toasts()[0];

    expect(toast?.position).toBe('top-right');
    expect(toast?.duration).toBe(3000);
    expect(toast?.showProgress).toBeFalse();
    expect(toast?.fontFamily).toBe('Roboto, "Helvetica Neue", Arial, sans-serif');
    expect(toast?.showIcons).toBeTrue();
    expect(toast?.closable).toBeFalse();
  });

  it('merges provided config via provideToastConfig', () => {
    TestBed.configureTestingModule({
      providers: [
        provideToastConfig({
          duration: 1200,
          position: 'bottom-center',
          showProgress: true,
          fontFamily: 'Inter, sans-serif',
          showIcons: false,
          closable: true,
        }),
      ],
    });
    const service = TestBed.inject(ToastService);

    service.info('Configured toast');
    const toast = service.toasts()[0];

    expect(toast?.position).toBe('bottom-center');
    expect(toast?.duration).toBe(1200);
    expect(toast?.showProgress).toBeTrue();
    expect(toast?.fontFamily).toBe('Inter, sans-serif');
    expect(toast?.showIcons).toBeFalse();
    expect(toast?.closable).toBeTrue();
  });

  it('allows enabling the progress bar per toast', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ToastService);

    service.warning('Per toast progress', { showProgress: true });
    const toast = service.toasts()[0];

    expect(toast?.showProgress).toBeTrue();
  });

  it('allows overriding the font per toast invocation', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ToastService);

    service.error('Custom font toast', {
      fontFamily: '"Fira Sans", sans-serif',
    });
    const toast = service.toasts()[0];

    expect(toast?.fontFamily).toBe('"Fira Sans", sans-serif');
  });

  it('allows hiding icons per toast invocation', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ToastService);

    service.success('No icon toast', { showIcons: false });
    const toast = service.toasts()[0];

    expect(toast?.showIcons).toBeFalse();
  });

  it('allows enabling the close button per toast invocation', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ToastService);

    service.info('Manually closable toast', { closable: true });
    const toast = service.toasts()[0];

    expect(toast?.closable).toBeTrue();
  });

  it('dismiss removes the toast immediately', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ToastService);

    service.warning('Dismiss me', { closable: true });
    const toast = service.toasts()[0];

    service.dismiss(toast!.id);

    expect(service.toasts().length).toBe(0);
  });
});
