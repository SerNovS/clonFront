import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TokenService } from '../../login/token.service';
import { TipoProducto } from '../tipo/tipo-producto';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  tipoProducto: TipoProducto[];
  paginador: any;
  mostado: boolean;
  filters = {
    keyword: '',
  };
  isAdmin = false;

  constructor(
    private productoService: ProductoService,
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

    this.productoService.getTipoProducto().subscribe((tipos) => {
      this.tipoProducto = tipos;
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

  activar(producto: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se activará el producto ${producto.nombreProducto}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.update(producto).subscribe((response) => {
          producto.visibilidad = true;
          Swal.fire(
            'Activado!',
            `Se ha activado el producto ${producto.nombreProducto}`,
            'success'
          );
        });
      }
    });
  }
  desactivar(producto: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se desactivara el producto ${producto.nombreProducto}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.update(producto).subscribe((response) => {
          producto.visibilidad = false;
          Swal.fire(
            'Desactivado!',
            `Se ha desactivara el producto ${producto.nombreProducto}`,
            'success'
          );
        });
      }
    });
  }

  listarProductos() {
    this.productoService
      .getProductoSinPagina()
      .subscribe((data) => (this.productos = this.productoFiltro(data)));
  }

  productoFiltro(producto: Producto[]) {
    return producto.filter((e) => {
      return e.nombreProducto
        .toLowerCase()
        .includes(this.filters.keyword.toLowerCase());
    });
  }

  productoByTipoId(id: number) {
    this.productoService.getProductoByTipoId(id).subscribe((data) => {
      this.productos = data as Producto[];
    });
  }
}
