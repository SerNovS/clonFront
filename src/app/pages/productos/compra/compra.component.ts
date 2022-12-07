import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto/producto';
import { ProductoService } from '../producto/producto.service';
import { Compra } from './compra';
import { CompraService } from './compra.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
})
export class CompraComponent implements OnInit {
  productos: Producto[] = [];
  preciosCompra: Compra[] = [];
  productoElegido: Producto = new Producto();
  nuevaCompra: Compra = new Compra();
  secreoContro2: Producto;
  secreoControl: Compra;
  rescata: Compra;

  resultadoAcutalizaStock: Producto;
  constructor(
    private productoService: ProductoService,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.productoService.dameProducto().subscribe((data) => {
      this.productos = data;
    });

    this.compraService.getListaPrecioCmopra().subscribe((data) => {
      this.preciosCompra = data;
    });
  }

  guarda() {
    console.log(this.nuevaCompra.producto.nombreProducto);
    console.log(
      'Id del dropdown: ' +
        this.nuevaCompra.producto.id +
        ' nombre: ' +
        this.nuevaCompra.producto.nombreProducto
    );
  }

  agregarNuevoPrecioCompra(pc) {
    if (
      this.nuevaCompra.precio > 0 &&
      this.nuevaCompra.producto != null &&
      this.nuevaCompra.precio <= 2147483640 &&
      this.nuevaCompra.cantidad > 0 &&
      this.nuevaCompra.cantidad <= 2147483640
    ) {
      this.nuevaCompra.fechaCompra = new Date();
      this.compraService
        .crearNuevoPrecioCompra(this.nuevaCompra)
        .subscribe((response: Compra) => {
          this.secreoControl = response;
        });

      this.showSuccessMessage(
        'Nuevo registro generado',
        `Se agregó un registro nuevo exitosamente`,
        'success',
        false
      );
      window.location.reload();
    } else {
      this.errorMessage(
        'Error an generar nuevo registro',
        'Recuerde elelgir un producto y agregar el valor de precio de venta mayor al precio de compra del producto.',
        'error',
        false
      );
    }
  }

  errorMessage(title, message, icon = null, showCancelButton = false) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton,
    });
  }
  showSuccessMessage(title, message, icon = null, showCancelButton = false) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton,
    });
  }
}
