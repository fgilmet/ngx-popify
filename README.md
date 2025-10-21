<p align="center">
  <img width="256" height="256" alt="popify-logo" src="./src/public/popify-logo.png" />
</p>

<h1 align="center">ngx-popify</h1>

<p align="center">Toast notifications for Angular 16+ powered by reactive signals and a drop-in view component.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ngx-popify">
    <img src="https://img.shields.io/npm/v/ngx-popify?logo=npm&color=CB3837" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/ngx-popify">
    <img src="https://img.shields.io/npm/dm/ngx-popify?color=CB3837" alt="npm downloads" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-3DA639.svg" alt="License: MIT" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ngx-popify">View on npm</a>
  &nbsp;|&nbsp;
  <a href="https://ngx-popify.vercel.app" target="_blank">Live playground</a>
</p>

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
- [Global Configuration](#configuration)
- [Styling](#styling)
- [Local Development](#local-development)
- [Licensing](#licensing)

## Features

- Lightweight service built on Angular signals for instant toast updates.
- Standalone `<toast-view>` component with six placement presets.
- Built-in icons and optional progress indicator, title, and custom fonts.
- Optional close button to let users dismiss notifications immediately.
- Global configuration helper to set defaults once at bootstrap.
- Theme-friendly CSS variables for background, border, and accent colors.

## Getting Started

### Installation

1. Install the library from npm:

   ```bash
   npm install ngx-popify
   ```

2. Add the icon packages required by `ToastView`:

   ```bash
   npm install @ng-icons/core @ng-icons/material-icons
   ```

3. Ensure your project targets Angular 16 or higher; the library relies on native signals.

### Quick Start

1. Mount the global view component in your root template (for example in `AppComponent`):

   ```ts
   // app.component.ts
   import { Component } from '@angular/core';
   import { ToastView } from '@fgilmet/ngx-popify';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [ToastView],
     template: `
       <router-outlet />
       <toast-view />
     `,
   })
   export class AppComponent {}
   ```

2. Inject the service wherever you need to trigger notifications:

   ```ts
   import { Component } from '@angular/core';
   import { ToastService } from '@fgilmet/ngx-popify';

   @Component({
     selector: 'app-dashboard',
     standalone: true,
     template: `<button (click)="notify()">Notify</button>`,
   })
   export class DashboardComponent {
     constructor(private readonly toast: ToastService) {}

     notify() {
       this.toast.success('Operation completed successfully');
     }
   }
   ```

### Available ToastOptions

```ts
toast.success('Saved successfully', {
  header: 'Success',
  duration: 5000,
  position: 'bottom-left', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  showProgress: true,
  showIcons: true,
  closable: true,
  fontFamily: 'Inter, sans-serif',
});
```

By default the close button stays hidden; set `closable: true` globally or per toast to enable it.

## Global Configuration

Set global defaults once during bootstrap with `provideToastConfig`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideToastConfig } from '@fgilmet/ngx-popify';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideToastConfig({
      header: 'Heads up',
      duration: 4000,
      position: 'bottom-center',
      showProgress: true,
      showIcons: false,
      closable: true,
    }),
  ],
});
```

## Styling

- Override the exposed CSS variables (`--toast-bg`, `--toast-border`, `--toast-base`, `--toast-text`, `--toast-text-secondary`) to match your theme.
- Use the `fontFamily` option to set typography per toast.
- Extend `.toast-view` or `.toast` with your own margins, shadows, or transitions as needed.

## Local Development

- `ng build popify` builds the library into `dist/popify`.
- `ng test` runs the unit tests.
- `npm publish` (executed from `dist/popify`) publishes the package to npm when ready.

## Licensing

Distributed under the [MIT](./LICENSE) license.
