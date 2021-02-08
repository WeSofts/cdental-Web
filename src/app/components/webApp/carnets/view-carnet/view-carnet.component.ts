import { DialogCarnetComponent } from './dialog-carnet/dialog-carnet.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarnetsService } from 'src/app/services/app/carnets/carnets.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private carnets: CarnetsService,
    private dialog: MatDialog
  ) { }

  carnet: any = {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.carnet = this.carnets.getCarnet(params['id']);
    });
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
