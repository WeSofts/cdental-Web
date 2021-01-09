import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../../../services/app/servicios/servicios.service';

@Component({
  selector: 'app-home-servicios',
  templateUrl: './home-servicios.component.html',
  styleUrls: ['./home-servicios.component.css']
})
export class HomeServiciosComponent implements OnInit {
  
  servicios: any[] = [
    {
      id_servicio: 1,
      servicio: 'Periodoncia',
      subservicios: [
        {
          id_sub: 45,
          subservicio: 'Empaste',
          costo: 4500
        },
        {
          id_sub: 46,
          subservicio: 'Amalgama',
          costo: 4500
        },
      ]
    },
    {
      id_servicio: 2,
      servicio: 'Endodoncia',
      subservicios: [
        {
          id_sub: 55,
          subservicio: 'Empaste con x',
          costo: 4500
        },
        {
          id_sub: 66,
          subservicio: 'Amalgama con y',
          costo: 4500
        },
      ]
    }
  ];
   servicioselected: SubServicio = {
    subservicio: 'string',
    costo: 0,
    servicio: '',
    id_servicio: 4,
    id_sub: 0,
   };
  formservicio: FormGroup;
  indexservice: number;
  indexsubservice: number;

  constructor(
    public fb: FormBuilder,
    private servServices: ServiciosService
  ) {
    this.formservicio = fb.group({
      nombre: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
    });
  }
  //#region getters validators
  get subservicioNoValido(){
    return this.formservicio.get('nombre').invalid && this.formservicio.get('nombre').touched;
  }
  get costoNoValido(){
    return this.formservicio.get('costo').invalid && this.formservicio.get('costo').touched;
  }
  get servicioNoValido(){
    return this.formservicio.get('servicio').invalid && this.formservicio.get('servicio').touched;
  }
  //#endregion

  setServicioSelected(subservicio: any, servicio: string, idservicio: number, indexsubservice: number, indexservice: number){
    this.servicioselected.costo = subservicio.costo;
    this.servicioselected.subservicio = subservicio.subservicio;
    this.servicioselected.id_sub = subservicio.id_sub;
    this.servicioselected.servicio = servicio;
    this.servicioselected.id_servicio = idservicio;
    this.indexsubservice = indexsubservice;
    this.indexservice = indexservice;
  }
  updatingSubServicio(){
    if( this.formservicio.invalid){
      return Object.values( this.formservicio.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    //al concluir refrescar la pagina sin perder la ruta
    console.log(this.servicioselected);
  }
  deletingSubServicio(){
    Swal.fire({
      title: `¿Deseas eliminar este subservicio ${this.servicioselected.subservicio}?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.servicios);
        //aqui se comienza a consumir el servicio
        this.servicios[this.indexservice].subservicios.splice(this.servicioselected[this.indexsubservice], 1);
        Swal.fire('Eliminado!', '', 'success');
      }
    });
  }
  ngOnInit(): void {
  }
}

export interface SubServicio{
  subservicio: string;
  costo: number;
  servicio: string;
  id_servicio: number;
  id_sub: number;
}