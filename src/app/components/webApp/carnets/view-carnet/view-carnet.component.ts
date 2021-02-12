
import { DialogCarnetComponent } from './dialog-carnet/dialog-carnet.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarnetsService } from 'src/app/services/app/carnets/carnets.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-carnet',
  templateUrl: './view-carnet.component.html',
  styleUrls: ['./view-carnet.component.css']
})
export class ViewCarnetComponent implements OnInit {

  displayedColumns: string[] = ['Fecha', 'Cantidad', 'Recibio', 'Opciones'];
  DCCitas: string[] = ['Fecha', 'Hora', 'Opciones'];
  dataSource: any[] = [
    { "id_recibo": 1, "Fecha": "01/12/21", "Cantidad": "300", "Recibio":"inicio" },
    { "id_recibo": 2, "Fecha": "01/12/21", "Cantidad": "300", "Recibio":"pagado" },
    { "id_recibo": 3, "Fecha": "01/12/21", "Cantidad": "300", "Recibio":"pagado" }
  ];
  dataSourceCitas: any[] = [
    { "id_cita": 1, "Fecha": "01/12/21", "Hora": "03:15 p.m." },
    { "id_cita": 2, "Fecha": "01/12/21", "Hora": "03:15 p.m." },
    { "id_cita": 3, "Fecha": "01/12/21", "Hora": "03:15 p.m." }
  ];
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
  ) {
   }

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
  }

  openDialogEdit( carnetselected: any[] ): void {
    (carnetselected != null) ?  carnetselected : carnetselected = null;
    const dialogRef = this.dialog.open(DialogCarnetComponent, {
      width: '250px',
      data: {carnet: carnetselected }
    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
  }

}

export interface BodyCarnetDetails{
  id_clinica: number;
  id_paciente: number;
  id_subservicio: number;
  id_servicioclientes: number;
}
