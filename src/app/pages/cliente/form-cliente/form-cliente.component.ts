import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
})
export class FormClienteComponent implements OnInit {
  titulo: string = 'Nuevo Cliente';

  cliente: Cliente = new Cliente();

  public errores: string[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/cliente']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente actualizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    );
  }
  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getId(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  crearCliente(): void {
    // console.log("apredato");
    // console.log(this.cliente);

    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/cliente']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente registrado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    );
  }
}
