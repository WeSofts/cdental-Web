import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/point.config';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {}

  insertService(body: any): Observable<any>{
    return this.http.post(`${this.appConfig.APP_ENDPOINT_LOCAL}dentista/add-service`, body);
  }
  insertSubService(body: any): Observable<any>{
    return this.http.post(`${this.appConfig.APP_ENDPOINT_LOCAL}dentista/add-sub-service`, body);
  }
  deleteSubService(idSubService: string): Observable<any>{
    return this.http.post(`${this.appConfig.APP_ENDPOINT_LOCAL}dentista/delete-sub-service`, {id_SubServicio: idSubService});
  }
  updatingSubService(body: any): Observable<any>{
    return this.http.put(`${this.appConfig.APP_ENDPOINT_LOCAL}dentista/update-sub-service`, body);
  }
  getServicios(idClinica: string): Observable<any>{
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/all-services-by-clinic', {id_clinica: idClinica});
  }
  getServiciosYSubServicios(idClinica: string): Observable<any>{
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/all-services-subservices-clinic', {id_clinica: idClinica});
  }
  getSubServicios(idServicio: string): Observable<any>{
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/all-sub-service-by-service', {id_servicio: idServicio});
  }
}
