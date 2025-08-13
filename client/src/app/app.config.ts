import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { provideToastr } from 'ngx-toastr';
registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      FormsModule,
      NgxDaterangepickerMd.forRoot({
        format: 'DD/MM/YYYY',
        displayFormat: 'DD/MM/YYYY',
        direction: 'ltr',
        weekLabel: 'W',
        separator: '-',
        cancelLabel: 'Cancel',
        applyLabel: 'Apply',
        clearLabel: 'Clear',
        customRangeLabel: 'Custom range',
        firstDay: 1,
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: false,
      maxOpened: 5,
      autoDismiss: false,
    }),
  ],
};
