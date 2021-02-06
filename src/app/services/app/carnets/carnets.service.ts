import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarnetsService {

  constructor() { }
  carnets: any[] = [
    {
      "nombre": "Jose Medellin",
      "servicio": "Empase de amalgama"
    },
    {
      "nombre": "Ernesto Medellin",
      "servicio": "Empase de amalgama"
    }
  ];

  buscar(valor: string){
    let carnetsArr: any[] = [];
    valor = valor.toLocaleLowerCase();
    for( let i = 0; i < this.carnets.length; i++){
      let carnet = this.carnets[i];
      let nombre = carnet.nombre.toLowerCase();
      if(nombre.indexOf(valor) >= 0){
        carnet.idx = 1;
        carnetsArr.push(carnet);
      }
    }
    return carnetsArr;
  }

  getCarnet( i: string){
    return this.carnets[i];
  }
}
