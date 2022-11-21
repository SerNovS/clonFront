import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChangePassword } from '../../models/change-password';
import { EmailPasswordService } from '../email-password.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
})
export class CambiarPasswordComponent implements OnInit {
  password: string;
  confirmPassword: string;
  tokenPassword: string;

  newPassword: ChangePassword;

  changePassword: ChangePassword;
  constructor(
    private emailPasswordService: EmailPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onChangePassword(): void {
    if (this.password !== this.confirmPassword) {
      Swal.fire(
        'Las contraseñas no coinciden!',
        'Favor ingresarlas de nuevo',
        'error'
      );
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.newPassword = new ChangePassword(
      this.password,
      this.confirmPassword,
      this.tokenPassword
    );
    this.emailPasswordService.changePassword(this.newPassword).subscribe(
      (data) => {
        Swal.fire('Contraseña cambiada con éxito', '', 'success');
        this.router.navigate(['/login']);
      },
      (err) => {
        Swal.fire('Error', err.error.mensaje, 'success');
      }
    );
  }
}
