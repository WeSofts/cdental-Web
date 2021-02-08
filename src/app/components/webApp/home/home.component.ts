import { Component, OnInit } from '@angular/core';
import { InicioAppServices } from '../../../services/app/home/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id_paciente', 'horario', 'paciente', 'servicio', 'costo'];
  dataSource = ELEMENT_DATA;
  fecha = new Date();
  currensatdistic: CurrentDateStadistic;

  StadisticsObject = {};
  constructor(
    private homeservice: InicioAppServices
  ) {
    this.currensatdistic = {
      mes_estadisticas: this.fecha.getMonth() + 1,
      anio_estadisticas: this.fecha.getFullYear(),
      dia_estadisticas: this.fecha.getDay(),
      id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica
    };
    this.homeservice.getStadistics(this.currensatdistic)
      .subscribe(
        (resp: any) => {
          this.StadisticsObject = resp.message;
          console.log(this.StadisticsObject);
        }
      );
  }

  get getNameMonth(){
    return monthNames[this.currensatdistic.mes_estadisticas - 1];
  }

  ngOnInit(): void {
    
  }
}

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export interface PeriodicElement {
  horario: string;
  paciente: string;
  servicio: string;
  costo: number;
  id_paciente: number;
}
export interface CurrentDateStadistic{
  dia_estadisticas: number;
  anio_estadisticas: number;
  mes_estadisticas: number;
  id_clinica: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {id_paciente: 1, paciente: 'Hydrogen', costo: 1.0079, servicio: 'H', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 2, paciente: 'Helium', costo: 4.0026, servicio: 'He', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 3, paciente: 'Lithium', costo: 6.941, servicio: 'Li', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 4, paciente: 'Beryllium', costo: 9.0122, servicio: 'Be', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 5, paciente: 'Boron', costo: 10.811, servicio: 'B', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 6, paciente: 'Carbon', costo: 12.0107, servicio: 'C', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 7, paciente: 'Nitrogen', costo: 14.0067, servicio: 'N', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 8, paciente: 'Oxygen', costo: 15.9994, servicio: 'O', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 9, paciente: 'Fluorine', costo: 18.9984, servicio: 'F', horario: '09:00 am - 10:00 pm'},
  {id_paciente: 10, paciente: 'Neon', costo: 20.1797, servicio: 'Ne', horario: '09:00 am - 10:00 pm'},
];