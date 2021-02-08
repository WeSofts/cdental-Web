
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.css']
})
export class CarnetComponent implements OnInit {

  @Input() carnet: any = {};
  @Input() index: number;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  VerCarnet(){
    this.router.navigateByUrl(`/cdental/vercarnet/${this.index}`);
  }

}
