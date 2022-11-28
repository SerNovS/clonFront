import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TokenService } from '../login/token.service';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  paginador: any;
  filterPost = '';

  roles: string[];
  isAdmin = false;
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {

    this.isAdmin = this.tokenService.isAdmin();
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clienteService
        .getCliente(page)
        .pipe(
          tap((response) => {
            (response.content as Cliente[]).forEach((cliente) => {});
          })
        )
        .subscribe((response) => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe((response) => {
          this.clientes = this.clientes.filter((cli) => cli !== cliente);
          Swal.fire(
            '¡Eliminado!',
            `Se ha eliminado el cliente ${cliente.nombre} ${cliente.apellido}`,
            'success'
          );
        });
      }
    });
  }
}
