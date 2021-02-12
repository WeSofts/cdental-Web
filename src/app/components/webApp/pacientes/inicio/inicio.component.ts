import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { PacientesService } from '../../../../services/app/pacientes/pacientes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenComponent } from './dialog-open/dialog-open.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit, OnInit {
  //#region TABLA, FILTRO Y PAGINATOR
  displayedColumns: string[] = ['Paciente', 'SubServicio', 'FechaContrato', 'Opciones'];
  dataSource = new MatTableDataSource();
  idclinica: string;
  total: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //#endregion

  constructor(
    private pacientesservice: PacientesService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.idclinica = JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.pacientesservice.getPacientes( this.idclinica )
      .subscribe( (resp: any) => {
        this.dataSource = new MatTableDataSource(resp.message);
        this.pacientesservice.TotalPacientes( this.idclinica )
          .subscribe( ( result: any ) => {
            this.total = result.message[0].Pacientes;
            this.ngAfterViewInit();
            Swal.close();
          }, (err) => {
            console.log(err);
          } );
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  OpenPaciente(body: any): void {
    const dialogRef = this.dialog.open(DialogOpenComponent, {
      width: '80%',
      data: body
    });
  }

  DeletePaciente( body: any ): void {
    console.log(body);
    Swal.fire({
      title: '¿Estás seguro?',
      html: `Esto eliminará toda información registrada a nombre de: <strong> ${ body.Paciente } </strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'De Acuerdo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const bodyCustDelete = {
          id_clinica: this.idclinica,
          id_paciente: body.NoPaciente,
          id_info: body.NoInfo
        };
        Swal.fire(
          'Procesando',
          'Por favor espere',
          'info'
        );
        Swal.showLoading();
        this.pacientesservice.DeletePaciente( bodyCustDelete )
          .subscribe( (resp: any) => {
            if ( !resp.error ) {
              Swal.fire(
                'Éxito',
                resp.message,
                'success'
              );
              this.ngOnInit();
            }else{
              Swal.fire({
                title: 'Parece que algo salió mal',
                text: resp.message,
                icon: 'error'
              });
            }
          }, (err) => {
            Swal.fire({
              title: 'Parece que algo salió mal',
              text: err.message,
              icon: 'error',
              footer: 'Contacta con administrador'
            });
            console.log(err);
          } );
      }
    });
  }

}

