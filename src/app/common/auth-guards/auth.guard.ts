import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private util: UtilService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.util.isLogged();

    if (!isLogged) {
      this.util.snackMsg('Você não está autorizado!');
      this.router.navigate(['/auth/login']);
    }

    return isLogged;
  }
}
