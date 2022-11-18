import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  changePassword: ChangePassword;
  constructor(
    private emailPasswordService: EmailPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onChangePassword():void {
    if(this.password!==this.confirmPassword){

    }
  }
}
