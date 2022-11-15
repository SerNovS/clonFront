import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  paginador: any;

  filterPost = '';
  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.productoService
        .getProducto(page)
        .pipe(
          tap((response) => {
            (response.content as Producto[]).forEach((producto) => {});
          })
        )
        .subscribe((response) => {
          this.productos = response.content as Producto[];
          this.paginador = response;
        });
    });
  }

  delete(producto: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el producto ${producto.nombreProducto}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(producto.id).subscribe((response) => {
          this.productos = this.productos.filter((cli) => cli !== producto);
          Swal.fire(
            '¡Eliminado!',
            `Se ha eliminado el cliente ${producto.nombreProducto}`,
            'success'
          );
        });
      }
    });
  }
}
