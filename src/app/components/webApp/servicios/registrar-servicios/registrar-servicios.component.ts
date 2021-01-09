import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-servicios',
  templateUrl: './registrar-servicios.component.html',
  styleUrls: ['./registrar-servicios.component.css']
})
export class RegistrarServiciosComponent implements OnInit {

  formservicio: FormGroup;
  formsubservicio: FormGroup;

  servicios: ServiciosInfo[] = [
    {
      id_servicio: 1,
      servicio: 'Endodoncia'
    },
    {
      id_servicio: 2,
      servicio: 'Periodoncia'
    }
  ];
  newServicio: ServiciosInfo = {
    id_servicio: 0,
    servicio: ''
  };
  newSubServicio: SubServicioInfo = {
    id_servicio: null,
    sub_servicio: '',
    precio: null
  };
  constructor(
    private fb: FormBuilder
  ) {
    this.formservicio = fb.group({
      nombresrv: ['', [Validators.required]],
    });
    this.formsubservicio = fb.group({
      nombresubsrv: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
    });
  }
  //#region getters validators
  get servicioNoValido(){
    return this.formservicio.get('nombresrv').invalid && this.formservicio.get('nombresrv').touched;
  }
  get costoNoValido(){
    return this.formsubservicio.get('costo').invalid && this.formsubservicio.get('costo').touched;
  }
  get sservicioNoValido(){
    return this.formsubservicio.get('servicio').invalid && this.formsubservicio.get('servicio').touched;
  }
  get subservicioNoValido(){
    return this.formsubservicio.get('nombresubsrv').invalid && this.formsubservicio.get('nombresubsrv').touched;
  }
  //#endregion

  NotExistsService(){
    console.log(this.newServicio);
    if(this.servicios.find(srv => srv.servicio === this.newServicio.servicio)){
      return false;
    }
  }

  addServicio(){
    if( this.formservicio.invalid){
      return Object.values( this.formservicio.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    if(this.NotExistsService() === false){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que este servicio ya fue registrado',
      });
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    // Aqui se comienza a consumir el servicio
  }
  addSubServicio(){
    console.log(this.newSubServicio);
    if( this.formsubservicio.invalid){
      return Object.values( this.formsubservicio.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    // Aqui se comienza a consumir el servicio
  }

  ngOnInit(): void {
  }

}

export interface ServiciosInfo{
  id_servicio: number;
  servicio: string;
}

export interface SubServicioInfo{
  id_servicio: number;
  sub_servicio: string;
  precio: number;
}