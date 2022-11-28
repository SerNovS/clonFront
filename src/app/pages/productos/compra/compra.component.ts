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
    console.log(this.productoElegido);
    console.log("Id del dropdown: "+this.productoElegido.id +" nombre: "+this.productoElegido.nombreProducto);
    this.preciosCompra.forEach(function(x){
      console.log("Fecha: "+x.fechaCompra+"id: "+x.id);
    }
      )    
  }

  modificar(){
   
  }
  show(){
    
  }

}
