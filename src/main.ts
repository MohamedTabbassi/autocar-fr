import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

