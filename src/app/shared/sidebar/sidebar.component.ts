import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/pages/login/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {


  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;


  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    // this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.nombreUsuario = this.tokenService.getUserName();
  }
}
