import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private util: UtilService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loginData = this.util.decodedToken();
    const rolesAllowed = route.data['roles'] as any[];

    if (!loginData || !rolesAllowed.includes(loginData.role)) {
      this.util.snackMsg('Você não está autorizado à acessar esta funcionalidade!');
      this.router.navigate(['/app/home']);
      return false;
    }

    return true;
  }
}
