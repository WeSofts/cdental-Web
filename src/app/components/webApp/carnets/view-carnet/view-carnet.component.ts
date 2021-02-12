
import { DialogCarnetComponent } from './dialog-carnet/dialog-carnet.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarnetsService } from 'src/app/services/app/carnets/carnets.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PagosCarnet, CitasCarnet } from '../../../../models/citas.select';
import { forkJoin } from 'rxjs';
import * as XLXS from 'xlsx';

@Component({
  selector: 'app-view-carnet',
  templateUrl: './view-carnet.component.html',
  styleUrls: ['./view-carnet.component.css']
})
export class ViewCarnetComponent implements OnInit {

  displayedColumns: string[] = ['Fecha', 'Cantidad', 'Recibio', 'Opciones'];
  DCCitas: string[] = ['Fecha', 'Hora', 'Opciones'];
  pagosRealizados: PagosCarnet[];
  citasCarnet: CitasCarnet[];
  // ===============================================================================
  bodycarnetdetails: BodyCarnetDetails = {
    id_clinica: 0,
    id_paciente: 0,
    id_servicioclientes: 0,
    id_subservicio: 0
  };
  resultDetails: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private carnets: CarnetsService,
    private dialog: MatDialog
  ) { }

  carnet: any = {};

  LoadCarnetDetails(): void {
    if ( !localStorage.getItem('carnet_selected') ){
      this.bodycarnetdetails = {
        id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica,
        id_paciente: this.carnet.NoPaciente,
        id_subservicio: this.carnet.NoSubservicio,
        id_servicioclientes: this.carnet.NoServicioPaciente,
      };
    } else {
      this.bodycarnetdetails = JSON.parse(localStorage.getItem('carnet_selected'));
      localStorage.removeItem('carnet_selected');
      this.carnet = JSON.parse(localStorage.getItem('carnet_selected_paciente'));
      localStorage.removeItem('carnet_selected_paciente');
    }
    this.carnets.CarnetDetails(this.bodycarnetdetails)
      .subscribe( (resp: any ) => {
        this.resultDetails = resp.message;
        console.log(this.resultDetails, "result");
        Swal.close();
      });
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.activatedRoute.params.subscribe( params => {
      this.carnet = this.carnets.getCarnet(params['id']);
    });
    this.LoadCarnetDetails();
    console.log(this.carnet);
    forkJoin({
      citasCarnet: this.carnets.loadCities(this.carnet.NoPaciente),
      pagosCarnet: this.carnets.loadPayments(this.carnet.NoPaciente)
    }).subscribe(data => {
      console.log(data);
      if (!data.citasCarnet.error && !data.pagosCarnet.error) {
        this.pagosRealizados = data.pagosCarnet.message;
        this.citasCarnet = data.citasCarnet.message;
        Swal.close();
      } else {
        Swal.fire('Ocurrio un error al obtener las citas y pagos', '', 'error');
      }
    }, err => console.log(err));
  }

  openDialogEdit( carnetselected: string, editInfo ?: any ): void {
    console.log(editInfo);
    const dialogRef = this.dialog.open(DialogCarnetComponent, {
      width: '500px',
      data: {carnet: carnetselected, paciente: this.resultDetails, editInfo }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.ngOnInit();
    });
  }
  deleteElement(infoDelete: any, type: string): void {
    Swal.fire({
      title: '¿Deseas eliminar?',
      text: `Al confirmar eliminaras el elemento.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        switch (type) {
          case '1':
            console.log(infoDelete);
            this.carnets.deleteCite({id_cita: infoDelete.NoCita, id_paciente: infoDelete.NoPaciente})
              .subscribe(data => {
                if (!data.error) {
                  this.ngOnInit();
                } else {
                  console.log(data);
                  Swal.fire('Ocurrio un error al eliminar!', '', 'error');
                }
              }, err => console.log(err));
            break;
          case '2':
            this.carnets.deletePayment({id_pago: infoDelete.NoPago, id_paciente: this.carnet.NoPaciente})
              .subscribe(data => {
                if (!data.error) {
                  this.ngOnInit();
                } else {
                  console.log(data);
                  Swal.fire('Ocurrio un error al eliminar!', '', 'error');
                }
              }, err => console.log(err));
            break;
          default:
        }
      }
    });
  }
  imprimir(type: string): void {
    switch (type) {
      case '1':
        const sheetCita: XLXS.WorkSheet = XLXS.utils.json_to_sheet(this.pagosRealizados);
        const bookCita: XLXS.WorkBook = {Sheets: { data: sheetCita}, SheetNames: ['data']};
        XLXS.writeFile(bookCita, 'pagos.xlsx');
        break;
      case '2':
        const sheetPago: XLXS.WorkSheet = XLXS.utils.json_to_sheet(this.citasCarnet);
        const bookPago: XLXS.WorkBook = {Sheets: { data: sheetPago}, SheetNames: ['data']};
        XLXS.writeFile(bookPago, 'citas.xlsx');
        break;
      default:
    }
  }
}

export interface BodyCarnetDetails{
  id_clinica: number;
  id_paciente: number;
  id_subservicio: number;
  id_servicioclientes: number;
}
