// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { UserRole } from '../models/user-model.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.auth.currentUserSubject.value;
    const expectedRoles: UserRole[] = route.data['roles'];

    console.log('AuthGuard.canActivate() => user=', currentUser, 'expectedRoles=', expectedRoles);

    // Pas connecté ?
    if (!currentUser) {
      // on redirige vers login, en mémorisant l’URL
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Si des rôles sont définis sur la route, on vérifie
    if (expectedRoles && expectedRoles.length > 0) {
      if (!expectedRoles.includes(currentUser.role)) {
        // pas autorisé
        alert('Vous n’avez pas la permission d’accéder à cette page');
        this.router.navigate(['/']);
        return false;
      }
    }

    // tout va bien
    return true;
  }
}
