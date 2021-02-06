import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.css']
})
export class CarnetsComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
  }
  buscarcarnet(valor: string){
    if( valor.length > 0){
      this.router.navigateByUrl(`/cdental/carnets/buscar/${valor}`);
      console.log(this.router);
    }else{
      this.router.navigateByUrl(`/cdental/carnets/allcarnets`);
    }
  }
}
