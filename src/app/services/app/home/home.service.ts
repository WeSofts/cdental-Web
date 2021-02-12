import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/point.config';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class InicioAppServices {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) { }

    getStadistics(body: any): Observable<any> {
        return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/stadistics', body);
    }

    getAgenda(body: any): Observable<any> {
        return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/agenda/loadcites', body);
    }

}
