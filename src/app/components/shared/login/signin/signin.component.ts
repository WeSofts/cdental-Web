import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  formlogin: FormGroup;
  formRecovery: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
   ) {
    this.formlogin = fb.group({
      correo: ['', [Validators.email, Validators.required]],
      contrasenia: ['', [Validators.required]]
    });

    this.formRecovery = fb.group({
      correo: [ '', [ Validators.email, Validators.required]]
    });
  }

  start(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.loginService.SignIn(this.formlogin.value).subscribe(
      data => {
        if( data.error === false ){
          Swal.close();
          this.router.navigateByUrl('/cdental/home');
        } else{
          Swal.fire({
            title: 'Error',
            text: 'Información incorrecta',
            icon: 'error'
          });
        }
      },
      err => {console.log(err)}
    );
  }
  recovery(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.loginService.ForgotPassword(this.formRecovery.value).subscribe(
      data => {
        console.log(data);
        Swal.fire({
          title: 'Recuperar',
          text: data,
          icon: 'info'
        });
      },
      err =>
      {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    console.log(this.loginService.autenticado());
    if(this.loginService.leerdata() != null){
      this.router.navigateByUrl('/cdental/home');
    }
  }

}
