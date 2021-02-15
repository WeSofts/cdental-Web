import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PacientesService } from 'src/app/services/app/pacientes/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  formInfoServicio: FormGroup;

  filteredOptions: Observable<any[]>;
  myControl: FormControl;
  tempchoose = '';
  isChecked = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  total: number;
  SubServicios: any[];
  currentService = {
    NoSubServicio: 0,
    SubServicio: '--',
    DescSubServicio: '--',
    Costo: 0,
    Servicio: '--',
    NoServicio: 0
  };
  comentarios = '';
  otherinfo = {
    Fecha: '',
    Dentista: ''
  };
  idclinica = '';
  firstemp = false;

  body = {
    Dentista: '',
    Clinica: '',
    Servicio: '',
    SubServicio: '',
    Costo: 0,
    Descripcion: '',
    FechaCotizacion: '',
    Total: 0,
    Comentarios: '',
    Email: ''
  };

  constructor(
    private fb: FormBuilder,
    private pservice: PacientesService,
    private snackBar: MatSnackBar
  ) {
    this.idclinica = JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica;
    this.formInfoServicio =  fb.group({
      Servicio: ['', [Validators.required]],
      Comentarios: ['']
    });
    this.pservice.GetAllSubServices(this.idclinica)
      .subscribe( ( resp: any ) => {
        console.log(resp, 'cotizaciones');
        this.SubServicios = resp.message;
        if ( !this.firstemp ){
          this.ngOnInit();
          this.firstemp = true;
        }
      }, (err) => {
        alert('Algo salió mal, intenta nuevamente o contacta con aniministrador. \n cdental.support@tecdevsmx.com');
        console.log(err);
      }
    );
  }
  get ServicioNoValido(){
    return this.formInfoServicio.get('Servicio').invalid && this.formInfoServicio.get('Servicio').touched;
  }

  ngOnInit(): void {
    this.myControl = new FormControl();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.FindOption(value))
    );
    this.otherinfo = {
      Fecha: new Date().toDateString(),
      Dentista: JSON.parse(localStorage.getItem('data_user_cdental'))[0].Dentista
    };
  }

  FindOption(value: string): any[] {
    return this.SubServicios.filter( option => option.SubServicio.toLowerCase().includes(value));
  }

  EnviarCotizacion(): void {
    if (!this.currentService){
      return;
    }
    let emailtemp = '';
    Swal.fire({
      title: 'Enviar cotización a: ',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        type: 'email',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (valor) => {
        if (this.ValidateEmail(valor)){
          this.BuildBody( valor );
        } else {
          this.snackBar.open(' Debes ingresar un email válido ', 'Ok', {
            duration: 1200,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      },
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pservice.SendEmailCotizacion( this.body )
          .subscribe( ( resp: any) => {
            if ( !resp.error ){
              Swal.fire({
                title: 'Cotización enviada',
                text: 'Se intentará notificar al email proporcionado',
                icon: 'success',
              });
            }else{
              console.log(result);
              Swal.fire({
                title: 'No se pudo enviar el correo',
                text: 'Comprueba correo y conexión a internet',
                icon: 'error',
                footer: 'cdental.support@tecdevsmx.com'
              });
            }
          }, (err) => {
            Swal.fire({
              title: 'Parece que algo salió mal',
              text: 'Intenta mas tarde o contacta con administrador',
              icon: 'error',
              footer: 'cdental.support@tecdevsmx.com'
            });
            console.log(err.message);
          });
      }
    });
  }

  BuildBody( emailtemp: string ): void {
    this.body = {
      Clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].Clinica,
      Comentarios: this.comentarios,
      Costo: this.currentService.Costo,
      Dentista: this.otherinfo.Dentista,
      Descripcion: this.currentService.DescSubServicio,
      Email: emailtemp,
      FechaCotizacion: this.otherinfo.Fecha,
      Servicio: this.currentService.Servicio,
      SubServicio: this.currentService.SubServicio,
      Total: this.total
    }
  }

  ServiceSelected( event ): void{
    this.currentService = event.option.value;
    this.tempchoose = this.currentService.SubServicio;
    this.total = this.currentService.Costo;
    return;
  }

  Multiplicar( value: number ): void {
    if ( this.currentService.Costo != 0 ){
      this.total = this.currentService.Costo * value;
      this.snackBar.open(' Total actualizado ', 'Ok', {
        duration: 700,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }else{
      this.snackBar.open(' Seleccione primero un servicio válido ', 'Ok', {
        duration: 700,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  ResetValue(): void {
    if ( !this.isChecked ){
      this.total = this.currentService.Costo;
    }
  }

  ValidateEmail( emailtemp: string ): boolean{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailtemp);
  }

  ChangeTotal(): void {
    let newtotaltemp = 0;
    Swal.fire({
      title: 'Ingrese el nuevo total',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        type: 'number'
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: (valor) => {
        newtotaltemp = valor;
      },
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.total > 0){
          console.log(newtotaltemp);
          this.total = newtotaltemp;
          this.snackBar.open(' Total actualizado ', 'Ok', {
            duration: 800,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this.snackBar.open(' Debes seleccionar un servicio válido ', 'Ok', {
            duration: 800,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    });
  }
}
