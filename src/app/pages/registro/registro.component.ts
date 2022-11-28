import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { NuevoUsuario } from '../login/models/nuevo-usuario';
import { TokenService } from '../login/token.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;
  errores: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(
      this.nombre,
      this.nombreUsuario,
      this.email,
      this.password
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      (data) => {
        Swal.fire(
          'Cuenta creada con éxito',
          'Bienvenido ' + this.nombreUsuario,
          'success'
        );
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errores = err.error.mensaje;
        Swal.fire('Error', 'error:' + this.errores, 'error');
        this.router.navigate(['/login']);
      }
    );
  }
}
