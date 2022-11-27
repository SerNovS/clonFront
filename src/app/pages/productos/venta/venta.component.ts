import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto/producto';
import { ProductoService } from '../producto/producto.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  productos: Producto[]=[];
  productoElegido: Producto=new Producto();
  constructor(private productoService: ProductoService) { }


  ngOnInit(): void {
    this.productoService.dameProducto().subscribe(data => {
      this.productos=data;
    });
    
  }

  guarda(){
    console.log(this.productoElegido);
    console.log("Id del dropdown: "+this.productoElegido.id +" nombre: "+this.productoElegido.nombreProducto);

    
  }

}