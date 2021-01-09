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

  InsertService(body: any){
    return true;
  }
  InsertSubService(body: any){
    return true;
  }
  DeleteSubService(body: any){
    return true;
  }
  UpdatingSubService(body: any){
    return true;
  }
  GetServicios(body: any){

  }
  GetSubServicios(body: any){
    
  }
}
