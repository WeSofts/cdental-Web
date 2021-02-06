import { Component, OnInit } from '@angular/core';
import { CarnetsService } from '../../../../services/app/carnets/carnets.service';

@Component({
  selector: 'app-all-carnets',
  templateUrl: './all-carnets.component.html',
  styles: [
  ]
})
export class AllCarnetsComponent implements OnInit {

  carnets: any[] = [];

  constructor(
    private carntesservice: CarnetsService
  ) {
    this.carnets = this.carntesservice.carnets;
   }

  ngOnInit(): void {
  }

}
