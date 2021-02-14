import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../../../../../models/localSession.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarnetsService } from '../../../../../services/app/carnets/carnets.service';
import { CitasSelect } from '../../../../../models/citas.select';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-carnet',
  templateUrl: './dialog-carnet.component.html',
  styleUrls: ['./dialog-carnet.component.css']
})
export class DialogCarnetComponent implements OnInit {

  abono = false;
  edit = false;
  cita = false;
  editarCita = false;
  pacientData: any;
  userData: UserData;
  formAddPago: FormGroup;
  formAddCita: FormGroup;
  formEditPago: FormGroup;
  formEditCita: FormGroup;
  citas: CitasSelect[];
  constructor(
    public dialogRef: MatDialogRef<DialogCarnetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private carnetService: CarnetsService,
    private router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem('data_user_cdental'))[0];
    this.formAddPago = this.fb.group({
      id_cita: ['1', [Validators.required]],
      Fecha_pago: ['', [Validators.required]],
      Cantidad: ['', [Validators.required]],
      Concepto: ['', [Validators.required, Validators.maxLength(125)]],
      id_paciente: ['1', [Validators.required]],
    });
    this.formEditPago = this.fb.group({
      id_cita: ['1', [Validators.required]],
      Fecha_pago: ['', [Validators.required]],
      Cantidad: ['', [Validators.required]],
      Concepto: ['', [Validators.required, Validators.maxLength(125)]],
      id_paciente: ['1', [Validators.required]],
      id_pago: ['1', [Validators.required]]
    });
    this.formAddCita = this.fb.group({
      Fecha_cita: ['', [Validators.required]],
      Hora_cita: ['', [Validators.required]],
      Asistencia_cita: ['', [Validators.required]],
      Evaluaciones: ['', [Validators.required]],
      Fecha_pago: ['', [Validators.required]],
      Cantidad: ['', [Validators.required]],
      Concepto: ['', [Validators.required]],
      id_paciente: ['1', [Validators.required]],
    });
    this.formEditCita = this.fb.group({
      Fecha_cita: ['', [Validators.required]],
      Hora_cita: ['', [Validators.required]],
      Asistencia_cita: [false, [Validators.required]],
      Evaluaciones: ['', [Validators.required]],
      id_cita: ['1', Validators.required],
      id_paciente: ['1', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.pacientData = this.data.paciente  ;
    switch (this.data.carnet) {
      case 'cita':
        this.cita = true;
        break;
      case 'pago':
        this.abono = true;
        break;
      case 'editar-pago':
        this.edit = true;
        this.formEditPago.patchValue({
          id_cita: this.data.editInfo.NoCita,
          Fecha_pago: this.data.editInfo.FechaPago,
          Cantidad: this.data.editInfo.CantidadPago,
          Concepto: this.data.editInfo.ConceptoPago,
          id_paciente: this.pacientData.NoPaciente,
          id_pago: this.data.editInfo.NoPago
        });
        break;
      case 'editar-cita':
        this.editarCita = true;
        this.formEditCita.patchValue({
          Fecha_cita: this.data.editInfo.FechaCita,
          id_cita: this.data.editInfo.NoCita,
          Hora_cita: this.data.editInfo.HoraCita,
          Asistencia_cita: this.data.editInfo.AsistenciaCita,
          Evaluaciones: this.data.editInfo.EvaluacionesCita,
          id_paciente: this.pacientData.NoPaciente,
        });
        break;
      default:
    }
    this.carnetService.getAllCites(this.pacientData.NoPaciente)
      .subscribe(data => {
        if (!data.error) {
          this.citas = data.message;
          console.log(this.citas);
        } else {
          console.log(data);
        }
      }, err => console.log(err));
  }
  addPago(): void {
    this.formAddPago.patchValue({
      id_paciente: this.pacientData.NoPaciente
    });
    this.carnetService.addPayment(this.formAddPago.value)
      .subscribe(data => {
        if (!data.error) {
          this.dialogRef.close();
          Swal.fire('Se registro el pago correctamente', '', 'success');
        } else {
          console.log(data);
          this.dialogRef.close();
          Swal.fire('Ocurrio un error al registrar el pago', '', 'error');
        }
      }, err => console.log(err));
  }
  editPago(): void {
    this.carnetService.updatePayment(this.formEditPago.value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire('Se actualizo el pago correctamente', '', 'success');
          this.dialogRef.close();
        } else {
          console.log(data);
          this.dialogRef.close();
          Swal.fire('Ocurrio un error al actualizar el pago', '', 'error');
        }
      }, err => console.log(err));
  }
  addCita(): void {
    this.formAddCita.patchValue({
      id_paciente: this.pacientData.NoPaciente,
    });
    this.carnetService.addCite(this.formAddCita.value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire('Se registro la cita correctamente', '', 'success');
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
          console.log(data);
          Swal.fire('Ocurrio un error al registrar la cita', '', 'error');
        }
      }, err => console.log(err));
  }
  editCita(): void {
    console.log(this.formEditCita.value);
    this.carnetService.updateCite(this.formEditCita.value)
      .subscribe(data => {
        if (!data.error) {
          this.dialogRef.close();
          Swal.fire('La cita se actualizo correctamente', '', 'success');
        } else {
          this.dialogRef.close();
          Swal.fire('Ocurrio un error al actualizar la cita', '', 'error');
        }
      }, err => console.log(err));
  }

}
