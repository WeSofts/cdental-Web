import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/point.config';

@Injectable({
  providedIn: 'root'
})

export class PacientesService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) { }

  getPacientes(idClinica: string): Observable<any>{
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/pacientes/load', {id_clinica: idClinica});
  }

  getPacienteDetails( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/pacientes/loadinfo', body);
  }

  UploadRadio( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/uploads/uploadradio', body);
  }
  UploadMoldes( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/uploads/uploadmolde', body);
  }
  UploadOtros( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/uploads/uploadotro', body);
  }

  TotalPacientes( idclinica: string ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/pacientes/total-customers', {id_clinica: idclinica});
  }

  DeletePaciente( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/customers/deletecustomer', body, httpOptions);
  }

  UpdatePaciente( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/customers/updatecustomer', body, httpOptions);
  }

  GetAllSubServices( idclinica: string): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/load-subservices', { id_clinica: idclinica });
  }

  InsertPaciente( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/customers/addcustomer', body, httpOptions);
  }

  SendEmailConfirmation( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT_LOCAL + 'dentista/send/confirmationservice', body);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};
