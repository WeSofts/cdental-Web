import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InicioAppServices } from '../../../services/app/home/home.service';
import { CarnetComponent } from '../carnets/carnet/carnet.component';
import { ViewCarnetComponent } from '../carnets/view-carnet/view-carnet.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Hora', 'Paciente', 'Servicio', 'Costo'];
  dataSource: any[];
  fecha = new Date();
  currensatdistic: CurrentDateStadistic;
  StadisticsObject = {};
  bodyagendarequest = {};
  carnetselected = {};
  constructor(
    private homeservice: InicioAppServices,
    private router: Router
  ) {
    this.currensatdistic = {
      mes_estadisticas: this.fecha.getMonth() + 1,
      anio_estadisticas: this.fecha.getFullYear(),
      dia_estadisticas: this.fecha.getDate(),
      id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica
    };
    this.bodyagendarequest = {
      id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica
    };
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.homeservice.getStadistics(this.currensatdistic)
      .subscribe(
        (resp: any) => {
          this.StadisticsObject = resp.message;
          console.log('stadistics', this.StadisticsObject);
          this.homeservice.getAgenda(this.bodyagendarequest)
            .subscribe( (resp: any) => {
              this.dataSource = resp.message;
              console.log(this.dataSource);
              Swal.close();
            });
        }
      );
  }

  openCarnet(item: any): void {
    this.carnetselected = {
      id_clinica: JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica,
      id_paciente: item.NoPaciente,
      id_subservicio: item.NoSubservicio,
      id_servicioclientes: item.NoServicioPaciente,
    };
    let datatemp = JSON.stringify(this.carnetselected);
    this.carnetselected = {
      Paciente: item.Paciente,
      SubServicio: item.SubServicio
    };
    let datatemppaciente = JSON.stringify(this.carnetselected);
    localStorage.setItem('carnet_selected', datatemp );
    localStorage.setItem('carnet_selected_paciente', datatemppaciente );
    this.router.navigateByUrl(`/cdental/carnets/allcarnets`);
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

export interface ResultBodyAgenda {
  NoPaciente: number;
  Paciente: string;
  NoCita: number;
  FechaCita: string;
  HorarioCita: string;
  AsistennciaCita: number;
  SubServicio: string;
  Costo: number;
}
export interface CurrentDateStadistic{
  dia_estadisticas: number;
  anio_estadisticas: number;
  mes_estadisticas: number;
  id_clinica: number;
}
