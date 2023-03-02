import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,of,catchError,map } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.verifyToken().pipe(
        map((response) => {
          if (response.status === 200) {
            return true;
          } else {
            window.location.href = '/login'
            return false;
          }
        }),
        catchError((e) => {
          window.location.href = '/login'
          return of(false);
        })
      );
    }
}
