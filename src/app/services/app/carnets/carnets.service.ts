
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/point.config';

@Injectable({
  providedIn: 'root'
})
export class CarnetsService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) { }
  @Input() carnets: any = [];
  getCarnets(idclinica: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnets/load', idclinica);
  }

  buscar(valor: string){
    let carnetsArr: any[] = [];
    valor = valor.toLocaleLowerCase();
    for( let i = 0; i < this.carnets.length; i++){
      let carnet = this.carnets[i];
      let nombre = carnet.Paciente.toLowerCase();
      console.log(carnet, 'carnet en for');
      if(nombre.indexOf(valor) >= 0){
        carnet.idx = i;
        carnetsArr.push(carnet);
        console.log(carnetsArr, "carnetarr");
      }
    }
    return carnetsArr;
  }

  getCarnet( i: string){
    console.log(this.carnets[i], 'en pos i' );
    console.log(this.carnets[0], 'en pos 0');
    return this.carnets[i];
  }

  CarnetDetails( body: any ): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnets/carnetdetails', body);
  }
  getAllCites(idPacientes: string): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/select-cites', {id_pacientes: idPacientes});
  }
  loadCities(idPacientes: string): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/loadcites', {id_paciente: idPacientes});
  }
  loadPayments(idPacientes: string): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/loadpayments', {id_paciente: idPacientes});
  }
  addPayment(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/addpayment', body);
  }
  updatePayment(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/updatepayment', body);
  }
  deletePayment(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/deletepayment', body);
  }
  addCite(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/addcites', body);
  }
  updateCite(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/updatecite', body);
  }
  deleteCite(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'dentista/carnet/cites/deletecite', body);
  }

}
