import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  clinica: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
    this.clinica = JSON.parse(localStorage.getItem('data_user_cdental'))[0].Clinica;
  }

  ngOnInit(): void {
    if( this.loginService.autenticado() ){
      this.router.navigateByUrl('/cdental/home');
    }else{
      this.router.navigateByUrl('/signin');
    }
  }

  salir(){
    this.loginService.LogOut();
    this.router.navigateByUrl('/signin');
  }

}
