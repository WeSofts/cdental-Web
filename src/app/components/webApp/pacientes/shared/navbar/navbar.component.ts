import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router
  ) {
    this.navLinks = [
      {
        label: 'Inicio',
        link: './home',
        index: 0
      },
      {
        label: 'Registrar Paciente',
        link: './registro',
        index: 1
      },
      {
        label: 'Añadir servicio',
        link: './agregar',
        index: 2
      },
      {
        label: 'Cotizaciones',
        link: './cotizaciones',
        index: 3
      },
    ];
  }

  navLinks: any[];
  activeLinkIndex = 0;

  ngOnInit(): void {
    this.route.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.route.url));
    });
  }

}
