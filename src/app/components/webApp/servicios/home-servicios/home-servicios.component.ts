import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../../../services/app/servicios/servicios.service';
import { forkJoin } from 'rxjs';
import { UserData } from '../../../../models/localSession.model';
import { ServicioList, SubServicioList } from '../../../../models/services.model';

@Component({
  selector: 'app-home-servicios',
  templateUrl: './home-servicios.component.html',
  styleUrls: ['./home-servicios.component.css']
})
export class HomeServiciosComponent implements OnInit {
  servicios: ServicioList[] = [];
  subServicioSelect: SubServicioList;
  servicioSelect: ServicioList;
  formservicio: FormGroup;
  indexservice: number;
  indexsubservice: number;
  userData: UserData;
  constructor(
    public fb: FormBuilder,
    private servServices: ServiciosService
  ) {
    this.userData = JSON.parse(localStorage.getItem('data_user_cdental'))[0];
    this.formservicio = fb.group({
      SubServicio: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      descripcion: ['ola', [Validators.required]],
      id_servicios: ['', [Validators.required]],
    });
  }
  //#region getters validators
  get subservicioNoValido(): boolean {
    return this.formservicio.get('SubServicio').invalid && this.formservicio.get('SubServicio').touched;
  }
  get costoNoValido(): boolean {
    return this.formservicio.get('precio').invalid && this.formservicio.get('precio').touched;
  }
  get descripcionNoValido(): boolean {
    return this.formservicio.get('descripcion').invalid && this.formservicio.get('descripcion').touched;
  }
  get servicioNoValido(): boolean {
    return this.formservicio.get('id_servicios').invalid && this.formservicio.get('id_servicios').touched;
  }
  //#endregion

  setServicioSelected(subservicio: SubServicioList, servicio: ServicioList): void {
    this.subServicioSelect = subservicio;
    this.servicioSelect = servicio;
    this.formservicio.patchValue({
      SubServicio: this.subServicioSelect.SubServicio,
      precio: this.subServicioSelect.precio,
      id_servicios: this.servicioSelect.id_servicio,
      descripcion: this.subServicioSelect.descripcion
    });
  }
  updatingSubServicio(): void {
    if (this.formservicio.invalid) {
      return Object.values(this.formservicio.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    // al concluir refrescar la pagina sin perder la ruta
    console.log(this.formservicio.value);
    this.servServices.updatingSubService(this.formservicio.value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire('Se actualizo correctamente', '', 'success');
        } else {
          console.log(data);
          Swal.fire('Ocurrio un error al actualizar', '', 'error');
        }
      });
  }
  deletingSubServicio(): void {
    Swal.fire({
      title: `¿Deseas eliminar este subservicio ${this.subServicioSelect.SubServicio}?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.subServicioSelect.id_SubServicio);
        // aqui se comienza a consumir el servicio
        this.servServices.deleteSubService(this.subServicioSelect.id_SubServicio.toString())
          .subscribe(data => {
            if (!data.error) {
              Swal.fire('Eliminado!', '', 'success');
              this.ngOnInit();
            } else {
              console.log(data);
              Swal.fire('Ocurrio un error al eliminarlo!', '', 'error');
            }
          }, err => console.log(err));
      }
    });
  }
  ngOnInit(): void {
    this.servServices.getServiciosYSubServicios(this.userData.NoClinica)
      .subscribe(data => {
        if (!data.error) {
          this.servicios = data.message;
        }
      }, err => console.log(err));
  }
}
