import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo:string = 'Inicie Sesión'

  usuario:Usuario;

  constructor() {
    this.usuario= new Usuario();
  }

  ngOnInit(): void {
  }

  login():void{
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Usario o contraseña vacías!',
        timer: 1500,
      });
      return;
    }
  }

}
