import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarnetsService } from '../../../../services/app/carnets/carnets.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: [
  ]
})
export class SearcherComponent implements OnInit {

  carnetsfilter: any[] = [];
  emptysearching = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carnets: CarnetsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.carnetsfilter = this.carnets.buscar(params['valor']);
      if (this.carnetsfilter.length > 0){
        this.emptysearching = false;
      }else{
        this.emptysearching = true;
      }
    });
  }

}
