import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto/producto';
import { ProductoService } from '../producto/producto.service';
import { Venta } from './venta';
import { VentaService } from './venta.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
 
  productos: Producto[]=[];
  preciosVenta: Venta[]=[];
  productoElegido: Producto=new Producto();
  nuevaVenta: Venta=new Venta();
  secreoContro2: Producto;
  secreoControl: Venta;
  rescata: Venta;

  resultadoAcutalizaStock: Producto;
  constructor(private productoService: ProductoService,private ventaService: VentaService) { }


  ngOnInit(): void {
    this.productoService.dameProducto().subscribe(data => {
      this.productos=data;
    });
    
    this.ventaService.getListaPrecioVenta().subscribe(data => {
      this.preciosVenta=data;
      
    });

    this.modificar();
  }

  guarda(){
    console.log(this.nuevaVenta.producto.nombreProducto);
    console.log("Id del dropdown: "+this.nuevaVenta.producto.id +" nombre: "+this.nuevaVenta.producto.nombreProducto );
  }

  agregarNuevoPrecioVenta(pc){
    this.preciosVenta.forEach(element => {
      console.log("Id: "+element.id+"Nombre: "+element.producto.nombreProducto+"Fecha: "+element.fechaVenta)
    });

    console.log("Producto a enviar en nueva venta: "+ this.nuevaVenta.producto.nombreProducto);
    console.log("Producto a enviarc en nueva venta (fehca): "+ this.nuevaVenta.fechaVenta);
    this.nuevaVenta.cantidad=0;
    this.nuevaVenta.fechaVenta=new Date();
    console.log("Producto a enviarc en nueva venta (fehca): "+ this.nuevaVenta.id);
    
    
    console.log("Producto a enviarc en nueva compra (fehca): "+ this.nuevaVenta.fechaVenta);
    console.log("Producto a enviarc en nueva compra (Stock): "+ this.nuevaVenta.producto.stock);
    console.log("Producto a enviarc en producto elegido: "+ this.productoElegido.stock);
    console.log("Producto a enviarc en producto elegido: "+ this.productoElegido.stock);
    this.ventaService.crearNuevoPrecioVenta(this.nuevaVenta).subscribe((response:Venta) => {
          this.secreoControl = response;  
    });

    console.log("Producto a enviar: "+this.nuevaVenta.producto.nombreProducto);
    this.rescata=this.nuevaVenta;
    console.log("Producto copia: "+this.rescata.producto.nombreProducto);
    this.nuevaVenta.producto.stock=this.nuevaVenta.cantidad;

    this.productoService.actualizaStock(this.nuevaVenta.producto).subscribe((response:Producto) => {
      this.resultadoAcutalizaStock = response;  
});

console.log("Stock actualizado?!"+this.resultadoAcutalizaStock.stock);
console.log("Flqg!");
  }
 
  

}