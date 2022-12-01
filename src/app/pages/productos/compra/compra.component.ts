import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto/producto';
import { ProductoService } from '../producto/producto.service';
import { Compra } from './compra';
import { CompraService } from './compra.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html'
  
})
export class CompraComponent implements OnInit {

  productos: Producto[]=[];
  preciosCompra: Compra[]=[];
  productoElegido: Producto=new Producto();
  nuevaCompra: Compra=new Compra();
  secreoContro2: Producto;
  secreoControl: Compra;
  rescata: Compra;

  resultadoAcutalizaStock: Producto;
  constructor(private productoService: ProductoService,private compraService: CompraService) { }


  ngOnInit(): void {
    this.productoService.dameProducto().subscribe(data => {
      this.productos=data;
    });
    
    this.compraService.getListaPrecioCmopra().subscribe(data => {
      this.preciosCompra=data;
    });
   
  }

  guarda(){
    console.log(this.nuevaCompra.producto.nombreProducto);
    console.log("Id del dropdown: "+this.nuevaCompra.producto.id +" nombre: "+this.nuevaCompra.producto.nombreProducto );
  }

  agregarNuevoPrecioCompra(pc){
    console.log("Producto a enviarc en producto elegido: No se usa"+ this.productoElegido.nombreProducto);
    console.log("Producto a enviarc en nueva compra: "+ this.nuevaCompra.producto.nombreProducto);
    console.log("Producto a enviarc en nueva compra (fehca): "+ this.nuevaCompra.fechaCompra);
    this.nuevaCompra.fechaCompra=new Date();
    console.log("Producto a enviarc en nueva compra (fehca): "+ this.nuevaCompra.fechaCompra);
    console.log("Producto a enviarc en nueva compra (Stock): "+ this.nuevaCompra.producto.stock);
    console.log("Producto a enviarc en producto elegido: "+ this.productoElegido.stock);
    console.log("Producto a enviarc en producto elegido: "+ this.productoElegido.stock);
    this.compraService.crearNuevoPrecioCompra(this.nuevaCompra).subscribe((response:Compra) => {
          this.secreoControl = response;  
    });

    console.log("Producto a enviar: "+this.nuevaCompra.producto.nombreProducto);
    this.rescata=this.nuevaCompra;
    console.log("Producto copia: "+this.rescata.producto.nombreProducto);
    this.nuevaCompra.producto.stock=this.nuevaCompra.cantidad;

    this.productoService.actualizaStock(this.nuevaCompra.producto).subscribe((response:Producto) => {
      this.resultadoAcutalizaStock = response;  
});

console.log("Stock actualizado?!"+this.resultadoAcutalizaStock.stock);
console.log("Flqg!");
  }
  modificar(){
    
  }
  

}
// agregarNuevoPrecioCompra(pc){
//   this.compraService.crearNuevoPrecioCompra(this.nuevaCompra).subscribe((response:Compra) => {
//     this.secreoControl = response;  
//   });
//   //console.log("Porducot ingresado?"+this.secreoControl);
//   this.productoService.actualizaStock(this.secreoControl.producto.id,this.secreoControl.cantidad).subscribe((response:Producto) => {
//     this.secreoContro2 = response;  
//   });
//   console.log("Porducot ingresado?"+this.secreoControl.producto.nombreProducto+" "+this.secreoControl.producto.id);
//   console.log("Porducot despues del cambio en stock?"+this.secreoContro2.nombreProducto+" "+this.secreoContro2.stock);
// }