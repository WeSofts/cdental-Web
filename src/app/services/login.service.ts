import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/point.config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data: any;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {}

  SignIn(body: any): Observable<any>{
    return this.http.post(this.appConfig.APP_ENDPOINT + 'user/signin', body)
    .pipe(
      map( (resp: any) => {
        console.log('Entro a login de admin');
        this.guardarData(JSON.stringify(resp));
        return resp;
      })
    );
  }

  ForgotPassword(email: string): Observable<any>{
    return this.http.post(this.appConfig.APP_ENDPOINT + 'user/recovery', email);
  }

  LogOut(){
    localStorage.removeItem('data_user_cdental');
  }

  private guardarData( data: any ){
    this.data = data;
    localStorage.setItem('data_user_cdental', data );
  }

  leerdata(){
    if ( localStorage.getItem('data_user_cdental')){
      this.data = localStorage.getItem('data_user_cdental');
    }else{
      this.data = '';
    }
    return this.data;
  }

  autenticado(): boolean {
    return this.data != null;
  }

}
