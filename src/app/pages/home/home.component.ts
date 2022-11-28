import { Component, OnInit } from '@angular/core';
import { TokenService } from '../login/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isLogged = false;
  nombreUsuario: string;

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
  }
}
