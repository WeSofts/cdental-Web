import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: LoginService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.leerdata()){
      return true;
    }else{
      this.router.navigateByUrl('/signin');
      return false;
    }
  }

}
