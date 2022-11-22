import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Nuevo Producto';

  public producto: Producto = new Producto();

  public errores: string[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
  }

  crearProducto(): void {
    this.productoService.create(this.producto).subscribe(
      (cliente) => {
        this.router.navigate(['/producto']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto creado con éxito',
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

  cargarProducto(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.getId(id).subscribe((producto) => {
          this.producto = producto;
        });
      }
    });
  }

  update(): void {
    this.productoService.update(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['producto']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto actualizado con éxito',
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
