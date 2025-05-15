import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { serverRoutes } from './app.routes.server';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch())
  ]
})

export const config = mergeApplicationConfig(appConfig, serverConfig);
