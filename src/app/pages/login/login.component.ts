import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from './models/login-usuario';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  public errores: string[] = [];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) // private toastr: ToastrService
  {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/home']);
        Swal.fire('Ingreso con éxito','Bienvenido '+ this.nombreUsuario, 'success');
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    );
  }
}
