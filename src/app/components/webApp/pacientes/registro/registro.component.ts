import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PacientesService } from '../../../../services/app/pacientes/pacientes.service';
import { MatStepper } from '@angular/material/stepper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formInfoPaciente: FormGroup;
  formInfoServicio: FormGroup;
  idclinica: string;
  firstemp = false;
  tempchoose = '';
  @ViewChild('stepper') stepper: MatStepper;


  isProcessingelection = false;
  filteredOptions: Observable<any[]>;
  myControl: FormControl;

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
  otherinfo = {
    Paciente: '--',
    Fecha: '',
    Dentista: ''
  };
  isChecked = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  body = {
    id_clinica: '',
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Radica: '',
    Email: '',
    Edad: 0,
    Alergias: '',
    Cirugias: '',
    Enfermedades: '',
    Total: 0,
    id_subservicio: 0
  };

  constructor(
    private fb: FormBuilder,
    private pservice: PacientesService,
    private snackBar: MatSnackBar
  ) {
    this.idclinica = JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica;
    this.formInfoPaciente = fb.group({
      Nombre: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Radica: ['', [Validators.required]],
      Edad: ['', [Validators.required]],
      Email: [''],
      Cirugias: [''],
      Enfermedades: [''],
      Alergias: ['']
    });
    this.formInfoServicio =  fb.group({
      Servicio: ['', [Validators.required]],
    });
    this.pservice.GetAllSubServices(this.idclinica)
      .subscribe( ( resp: any ) => {
        console.log(resp);
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

  //#region getters validators INFOPACIENTE
  get nombreNoValido(): boolean {
    return this.formInfoPaciente.get('Nombre').invalid && this.formInfoPaciente.get('Nombre').touched;
  }
  get direccionNoValido(): boolean {
    return this.formInfoPaciente.get('Direccion').invalid && this.formInfoPaciente.get('Direccion').touched;
  }
  get telefonoNoValido(): boolean {
    return this.formInfoPaciente.get('Telefono').invalid && this.formInfoPaciente.get('Telefono').touched;
  }
  get radicaNoValido(): boolean {
    return this.formInfoPaciente.get('Radica').invalid && this.formInfoPaciente.get('Radica').touched;
  }
  get edadNoValido(): boolean {
    return this.formInfoPaciente.get('Edad').invalid && this.formInfoPaciente.get('Edad').touched;
  }
  //#endregion

  //#region gets validators INFOSERVICIO
  get ServicioNoValido(){
    return this.formInfoServicio.get('Servicio').invalid && this.formInfoServicio.get('Servicio').touched;
  }
  //#endregion

  ngOnInit(): void {
    this.myControl = new FormControl();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.FindOption(value))
    );
  }

  FindOption(value: string): any[] {
    return this.SubServicios.filter( option => option.SubServicio.toLowerCase().includes(value));
  }

  ServiceSelected( event ): void{
    this.currentService = event.option.value;
    this.tempchoose = this.currentService.SubServicio;
    this.total = this.currentService.Costo;
    console.log(this.currentService);
    return;
  }

  SetOtherInfo(): void{
    this.otherinfo = {
      Paciente: this.formInfoPaciente.value.Nombre,
      Fecha: new Date().toDateString(),
      Dentista: JSON.parse(localStorage.getItem('data_user_cdental'))[0].Dentista
    };
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
            duration: 700,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    });
  }
  LoadInfo(): void {
    console.log(this.currentService, 'subservice');
    console.log(this.formInfoPaciente.value, 'form paciente');
    this.isProcessingelection = true;
    this.body = {
      id_clinica: this.idclinica,
      Alergias: this.formInfoPaciente.value.Alergias,
      Cirugias: this.formInfoPaciente.value.Cirugias,
      Direccion: this.formInfoPaciente.value.Direccion,
      Edad: this.formInfoPaciente.value.Edad,
      Email: this.formInfoPaciente.value.Email,
      Enfermedades: this.formInfoPaciente.value.Enfermedades,
      Nombre: this.formInfoPaciente.value.Nombre,
      Radica: this.formInfoPaciente.value.Radica,
      Telefono: this.formInfoPaciente.value.Telefono,
      Total: this.total,
      id_subservicio: this.currentService.NoSubServicio
    };
    console.log(this.body, 'body all');
    this.isProcessingelection = false;
  }

  ConfirmationService(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
     }
    );
    Swal.showLoading();
    this.pservice.InsertPaciente( this.body )
      .subscribe( ( resp: any ) => {
        if ( !resp.error ){
          if ( this.body.Email != null ){
            Swal.fire({
              title: 'Todo Correcto',
              text: resp.message[0],
              html: `¿Desea enviar un correo a: <strong> ${ this.body.Email } </strong> con la información del servicio contratado?`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'De Acuerdo!',
              cancelButtonText: 'Ahora no'
            }).then((result) => {
              if (result.isConfirmed) {
                const bodyEmail = {
                  Paciente: this.body.Nombre,
                  Email: this.body.Email,
                  Clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].Clinica
                };
                Swal.fire(
                  'Procesando',
                  'Por favor espere',
                  'info'
                );
                Swal.showLoading();
                this.pservice.SendEmailConfirmation( bodyEmail )
                  .subscribe( (result: any) => {
                    if ( !result.error ){
                      Swal.fire({
                        title: 'Confirmación enviada',
                        text: 'Tu paciente será notificado',
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
          } else {
            Swal.fire({
              title: 'Todo correcto',
              text: resp.message[0],
              icon: 'success',
              footer: 'Ahora puedes ver su carnet, pagos e información'
            });
          }
        }else{
          console.log(resp);
          Swal.fire({
            title: 'Parece que algo salió mal',
            text: resp.message,
            icon: 'error',
            footer: 'Si crees que se trata de un error, contacta con cdental.support@tecdevsmx.com'
          });
        }
      }, (err) => {
        Swal.fire({
          title: 'Parece que algo salió mal',
          text: 'Intenta mas tarde o contacta con administrador',
          icon: 'error',
          footer: 'cdental.support@tecdevsmx.com'
        });
        console.log(err);
      }
      )
  }

}
