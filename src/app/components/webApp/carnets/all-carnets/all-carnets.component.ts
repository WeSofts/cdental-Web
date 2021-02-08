
import { Component, OnInit } from '@angular/core';
import { CarnetsService } from '../../../../services/app/carnets/carnets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-carnets',
  templateUrl: './all-carnets.component.html',
  styles: [
  ]
})
export class AllCarnetsComponent implements OnInit {

  carnets: any[] = [];
  idclinical: ClinicaObj = {
    idclinica: '0'
  };
  constructor(
    private carntesservice: CarnetsService
  ) {
    
  }

  LoadData(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    this.carntesservice.getCarnets(this.idclinical)
      .subscribe( (resp: any) => {
        Swal.close();
        this.carnets = resp.message;
        this.carntesservice.carnets = this.carnets;
      });
  }

  ngOnInit(): void {
    this.idclinical.idclinica = JSON.parse(localStorage.getItem('data_user_cdental'))[0].NoClinica;
    this.LoadData();
  }

}

export interface ClinicaObj{
  idclinica: string;
}
