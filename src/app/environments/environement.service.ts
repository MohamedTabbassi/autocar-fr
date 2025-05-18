import { Injectable } from '@angular/core';

Injectable({
  providedIn: 'root'
})

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:4000/api', // Local backend URL for development
};
