import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/pages/login/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {


  roles: string[];
  isAdmin = false;


  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (rol === 'ROLE_TRABAJADOR') {
        this.isAdmin = true;
      }
    });
  }
}
