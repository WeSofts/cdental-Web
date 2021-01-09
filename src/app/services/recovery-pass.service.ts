import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPassService {

  constructor(private http:HttpClient, private appConfig:AppConfig) { }

  recovery(body: any):Observable<any>{
    return this.http.post(this.appConfig.app_ENDPOINT + 'user/recovery', body);
  }
}
