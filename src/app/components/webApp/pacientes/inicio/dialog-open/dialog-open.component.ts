import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PacientesService } from 'src/app/services/app/pacientes/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-open',
  templateUrl: './dialog-open.component.html',
  styleUrls: ['./dialog-open.component.css']
})
export class DialogOpenComponent implements OnInit {
  formpaciente: FormGroup;
  isLoadingResults = false;
  isUploadingResults = false;
  currentinfo: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('image', {
    read: ElementRef
  }) imagen: ElementRef;

  @ViewChild('imageMolde', {
    read: ElementRef
  }) imagenMolde: ElementRef;

  @ViewChild('imageOtro', {
    read: ElementRef
  }) imagenOtro: ElementRef ;

  constructor(
    public dialogRef: MatDialogRef<DialogOpenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacienteservice: PacientesService,
    public fb: FormBuilder,
    private snackBar: MatSnackBar

  ) {
    this.formpaciente = fb.group({
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
  }

  //#region getters validators
  get nombreNoValido(): boolean {
    return this.formpaciente.get('Nombre').invalid && this.formpaciente.get('Nombre').touched;
  }
  get direccionNoValido(): boolean {
    return this.formpaciente.get('Direccion').invalid && this.formpaciente.get('Direccion').touched;
  }
  get telefonoNoValido(): boolean {
    return this.formpaciente.get('Telefono').invalid && this.formpaciente.get('Telefono').touched;
  }
  get radicaNoValido(): boolean {
    return this.formpaciente.get('Radica').invalid && this.formpaciente.get('Radica').touched;
  }
  get edadNoValido(): boolean {
    return this.formpaciente.get('Edad').invalid && this.formpaciente.get('Edad').touched;
  }
  //#endregion

  ngOnInit(): void {
    const bodyrequest = {
      id_paciente: this.data.NoPaciente,
      id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica,
      id_servicioclientes: this.data.NoContrato
    };
    this.isLoadingResults = true;
    this.pacienteservice.getPacienteDetails( bodyrequest )
      .subscribe( (resp: any) => {
        this.setValuesForm(resp.message[0]);
        this.isLoadingResults = false;
      }, error => {
        // this.isLoadingResults = false;
      }
    );
  }

  //#region Upload Otro
  readURLOtros(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.currentinfo.Fotos = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }
  UploadOtros(): void {
    if (!this.imagenOtro.nativeElement.files[0]) {
      this.snackBar.open('Selecciona una foto', 'Ok', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    this.isUploadingResults = true;
    const imagen = this.imagenOtro.nativeElement.files[0];
    const valores = new FormData();
    console.log(this.data, 'data');
    valores.append('id_expediente', this.currentinfo.NoExpediente);
    valores.append('otroimg', imagen);
    this.pacienteservice.UploadOtros(valores)
      .subscribe( (resp: any) => {
        console.log(resp, 'resp');
        if (!resp.error) {
          this.snackBar.open('Fotos actualizadas', 'Ok', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        } else {
          console.log(resp);
          this.snackBar.open(resp.message, 'Ok', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }, err => console.log(err)
    ).add(() => this.isUploadingResults = false);
  }
  //#endregion
  //#region Upload Radiografia
  readURL(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.currentinfo.Radiografia = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }

  UploadRadio(): void {
    if (!this.imagen.nativeElement.files[0]) {
      this.snackBar.open('Selecciona una foto', 'Ok', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    this.isUploadingResults = true;
    const imagen = this.imagen.nativeElement.files[0];
    const valores = new FormData();
    console.log(this.data, 'data');
    valores.append('id_expediente', this.currentinfo.NoExpediente);
    valores.append('radioimg', imagen);
    this.pacienteservice.UploadRadio(valores)
      .subscribe( (resp: any) => {
        console.log(resp, 'resp');
        if (!resp.error) {
          this.snackBar.open('Radiografía actualizada', 'Ok', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        } else {
          console.log(resp);
          this.snackBar.open(resp.message, 'Ok', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }, err => console.log(err)
    ).add(() => this.isUploadingResults = false);
  }
  //#endregion
  //#region Moldes upload
  readURLMoldes(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.currentinfo.Moldes = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }
  UploadMoldes(): void {
    if (!this.imagenMolde.nativeElement.files[0]) {
      this.snackBar.open('Selecciona una foto', 'Ok', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    this.isUploadingResults = true;
    const imagen = this.imagenMolde.nativeElement.files[0];
    const valores = new FormData();
    console.log(this.data, 'data');
    valores.append('id_expediente', this.currentinfo.NoExpediente);
    valores.append('moldeimg', imagen);
    this.pacienteservice.UploadMoldes(valores)
      .subscribe( (resp: any) => {
        console.log(resp, 'resp');
        if (!resp.error) {
          this.snackBar.open('Moldes actualizados', 'Ok', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        } else {
          console.log(resp);
          this.snackBar.open(resp.message, 'Ok', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }, err => console.log(err)
    ).add(() => this.isUploadingResults = false);
  }
  //#endregion

  setValuesForm( body: any ): void {
    console.log(body, 'body');
    this.currentinfo = body;
    if ( this.currentinfo.Radiografia !== '') { this.currentinfo.Radiografia = 'https://tecdevsmx.com' + this.currentinfo.Radiografia; }
    if ( this.currentinfo.Moldes !== '') { this.currentinfo.Moldes = 'https://tecdevsmx.com' + this.currentinfo.Moldes; }
    if ( this.currentinfo.Fotos !== '') { this.currentinfo.Fotos = 'https://tecdevsmx.com' + this.currentinfo.Fotos; }
    this.formpaciente.patchValue({
      Nombre: body.Paciente,
      Direccion: body.Direccion,
      Telefono: body.Telefono,
      Radica: body.Radica,
      Edad: body.Edad,
      Email: body.Email,
      Cirugias: body.Cirugias,
      Enfermedades: body.Enfermedades,
      Alergias: body.Alergias
    });
  }

  GetandSetValuesForm(): any{
    const bodyupdate = {
      id_paciente: this.currentinfo.NoPaciente,
      id_historial: this.currentinfo.NoHistoria,
      id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica,
      Nombre: this.formpaciente.value.Nombre,
      Direccion: this.formpaciente.value.Direccion,
      Telefono: this.formpaciente.value.Telefono,
      Radica: this.formpaciente.value.Radica,
      Email: this.formpaciente.value.Email,
      Edad: this.formpaciente.value.Edad,
      Alergias: this.formpaciente.value.Alergias,
      Cirugias: this.formpaciente.value.Cirugias,
      Enfermedades: this.formpaciente.value.Enfermedades
    };
    return bodyupdate;
  }

  UpdateInfo( ): void {
    if ( this.formpaciente.invalid ){
      return Object.values( this.formpaciente.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    let newbody = this.GetandSetValuesForm();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
     }
    );
    Swal.showLoading();
    this.pacienteservice.UpdatePaciente( newbody )
      .subscribe( ( resp: any ) => {
        console.log(resp, 'update');
        if ( !resp.error ) {
          this.dialogRef.close();
          Swal.fire(
            'Éxito',
            resp.message[0].msg,
            'success'
          );
          this.ngOnInit();
        }else{
          this.snackBar.open(resp.message[0].msg, 'Ok', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          console.log(resp.message);
        }
      }, (err) => {
        this.dialogRef.close();
        Swal.fire({
          title: 'Parece que algo salió mal',
          text: err.message,
          icon: 'error',
          footer: 'Contacta con administrador'
        });
        console.log(err);
      }
    );
  }

}
