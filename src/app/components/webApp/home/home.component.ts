import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id_paciente', 'horario', 'paciente', 'servicio', 'costo'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }
}

export interface PeriodicElement {
  horario: string;
  paciente: string;
  servicio: string;
  costo: number;
  id_paciente: number;
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