import { Component, OnInit } from '@angular/core';
import { Producto } from '../productos/producto/producto';
import { ProductoService } from '../productos/producto/producto.service';
import { TipoProducto } from '../productos/tipo/tipo-producto';

@Component({
  selector: 'search-tipo',
  templateUrl: './search-tipo.component.html',
})
export class SearchTipoComponent implements OnInit {
  nombreTipos: TipoProducto[] = [];
  productos: Producto[];
  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getAllTipos();
    console.log('hola mundo');
    console.log(this.productos);
  }

  getAllTipos(): void {
    this.productoService.getTipoProducto().subscribe((data) => {
      this.nombreTipos = data;
    });
  }

  getProductos(id: number) {
    this.productoService.getProductosByTipo(4).subscribe((data) => {
      this.productos = data as Producto[];
    });
  }
}
