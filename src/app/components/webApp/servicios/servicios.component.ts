import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = 0;

  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Servicios',
          link: './allservices',
          index: 0
      },
      {
        label: 'Registrar Servicios y subservicios',
        link: './registro',
        index: 1
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
