import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto/producto';
import { ProductoService } from '../producto/producto.service';
import { Venta } from './venta';
import { VentaService } from './venta.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  productos: Producto[] = [];
  preciosVenta: Venta[] = [];
  nuevaVenta: Venta = new Venta();
  secreoContro2: Producto;
  secreoControl: Venta;
  rescata: Venta;

  esmayorAcompra: Producto;
  resultadoAcutalizaStock: Number;
  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.productoService.dameProducto().subscribe((data) => {
      this.productos = data;
    });

    this.ventaService.getListaPrecioVenta().subscribe((data) => {
      this.preciosVenta = data;
    });
  }

  guarda() {
    console.log(this.nuevaVenta.producto.nombreProducto);
    console.log(
      'Id del dropdown: ' +
        this.nuevaVenta.producto.id +
        ' nombre: ' +
        this.nuevaVenta.producto.nombreProducto
    );
  }

  agregarNuevoPrecioVenta(pc) {
    
    console.log(this.nuevaVenta.precio);
    if (
      this.nuevaVenta.precio > 0 &&
      this.nuevaVenta.producto != null &&
      this.nuevaVenta.precio <= 2147483640 &&
      this.nuevaVenta.producto.ultimoPrecioCompra<this.nuevaVenta.precio
    ) {
      // this.preciosVenta.forEach(element => {
      //   console.log("Id: "+element.id+" Nombre: "+element.producto.nombreProducto+" Fecha: "+element.fechaVenta)
      // });

      // console.log("Nombre: "+ this.nuevaVenta.producto.nombreProducto +
      // " Fecha: "+ this.nuevaVenta.fechaVenta);

      // this.nuevaVenta.cantidad=0;
      this.nuevaVenta.fechaVenta=new Date();
      // console.log("Id: "+this.nuevaVenta.id+" Nombre: "+this.nuevaVenta.producto.nombreProducto+
      // " Fecha: "+this.nuevaVenta.fechaVenta +" Stock: "+ this.nuevaVenta.producto.stock )

      this.ventaService
        .crearNuevoPrecioVenta(this.nuevaVenta)
        .subscribe((response: Venta) => {
          this.secreoControl = response;
        });

        console.log("Paso agregar venta y asignar nuevo precio venta en propducto");

      // // console.log("Rsultado creacion:")
      // // console.log("Id: "+this.secreoControl.id+" Nombre: "+this.secreoControl.producto.nombreProducto+
      // // " Fecha: "+this.secreoControl.fechaVenta +" Stock: "+ this.secreoControl.producto.stock )

      // this.productoService
      //   .actualizaStock(this.nuevaVenta.producto)
      //   .subscribe((response: Producto) => {
      //     this.resultadoAcutalizaStock = response;
      //   });

        console.log("Paso stock");

      //   console.log("Id: "+this.secreoControl.id+" Nombre: "+this.secreoControl.producto.nombreProducto+
      // " Fecha: "+this.secreoControl.fechaVenta +" Stock: "+ this.secreoControl.producto.stock );
      // console.log("Id: "+this.resultadoAcutalizaStock.id+" Nombre: "+this.resultadoAcutalizaStock.nombreProducto+
      // " Stock: "+ this.resultadoAcutalizaStock.stock );
      console.log("Paso read");

        if(this.secreoControl===null){
          console.log("algo pasa pelao");
        }
      this.showSuccessMessage(
        'Nuevo registro generado',
        `Se agregó un registro nuevo exitosamente`,
        'success',
        false
      );
      //console.log('Stock actualizado: ' + this.resultadoAcutalizaStock.stock);
      //window. location. reload();
    } else {
      this.errorMessage(
        'Error an generar nuevo registro',
        'Recuerde elelgir un producto y agregar el valor de precio de venta mayor al precio de compra del producto.',
        'error',
        false
      );
    }
    console.log("Paso todo?");
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

  reload(){
    this.nuevaVenta.precio
  }
}
