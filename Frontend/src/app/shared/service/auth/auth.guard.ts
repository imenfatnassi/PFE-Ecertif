import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
 CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 

    if (this.authService.isLoggedIn) {
     
        // check if route is restricted by role
        if (route.data.roles && !route.data.roles.includes(localStorage.getItem('role'))) {
        
            // role not authorised so redirect to home page
            this.router.navigate(['/resultat']);
            return false;
        }
    
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
}