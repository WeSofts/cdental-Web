import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../../../services/app/servicios/servicios.service';
import { UserData } from '../../../../models/localSession.model';
import { Servicios } from '../../../../models/services.model';

@Component({
  selector: 'app-registrar-servicios',
  templateUrl: './registrar-servicios.component.html',
  styleUrls: ['./registrar-servicios.component.css']
})
export class RegistrarServiciosComponent implements OnInit {

  formservicio: FormGroup;
  formsubservicio: FormGroup;
  userData: UserData;
  servicios: Servicios[];
  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService
  ) {
    this.userData = JSON.parse(localStorage.getItem('data_user_cdental'))[0];
    this.formservicio = this.fb.group({
      Nombre: ['', [Validators.required]],
      id_clinica: [this.userData.NoClinica],
    });
    this.formsubservicio = this.fb.group({
      SubServicio: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      id_servicios: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }
  //#region getters validators
  get servicioNoValido(): boolean{
    return this.formservicio.get('Nombre').invalid && this.formservicio.get('Nombre').touched;
  }
  get costoNoValido(): boolean{
    return this.formsubservicio.get('precio').invalid && this.formsubservicio.get('precio').touched;
  }
  get descripcionNoValido(): boolean{
    return this.formsubservicio.get('descripcion').invalid && this.formsubservicio.get('descripcion').touched;
  }
  get sservicioNoValido(): boolean{
    return this.formsubservicio.get('id_servicios').invalid && this.formsubservicio.get('id_servicios').touched;
  }
  get subservicioNoValido(): boolean{
    return this.formsubservicio.get('SubServicio').invalid && this.formsubservicio.get('SubServicio').touched;
  }
  //#endregion

  NotExistsService(): boolean{
    if (this.servicios.find(srv => srv.Nombre === this.formservicio.value.Nombre)){
      return false;
    }
  }

  addServicio(): void{
    if (this.formservicio.invalid){
      return Object.values( this.formservicio.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    if (this.NotExistsService() === false){
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
    console.log(this.formservicio.value);
    // Aqui se comienza a consumir el servicio
    this.serviciosService.insertService(this.formservicio.value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'Se registro correctamente',
            icon: 'success'
          });
          this.ngOnInit();
        } else {
          console.log(data);
          Swal.fire({
            title: 'No se registro correctamente',
            icon: 'error',
            text: data.message
          });
        }
      }, err => console.log(err));
  }
  addSubServicio(): void{
    if (this.formsubservicio.invalid){
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
    this.serviciosService.insertSubService(this.formsubservicio.value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'Se registro correctamente el sub servicio',
            icon: 'success'
          });
        } else {
          console.log(data);
          Swal.fire({
            title: 'Ocurrio un error al registrar el sub servicio',
            icon: 'error',
            text: data.message
          });
        }
      }, err => console.log(err));
  }

  ngOnInit(): void {
    forkJoin({
      servicios: this.serviciosService.getServicios(this.userData.NoClinica.toString())
    }).subscribe(data => {
      if (!data.servicios.error) {
        this.servicios = data.servicios.message;
      }
    }, err => console.log(err));
  }
}
