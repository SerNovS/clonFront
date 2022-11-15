import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public titulo: string = 'Nuevo Producto';

  public producto: Producto = new Producto();


  constructor(private productoService: ProductoService, private router:Router) {}

  ngOnInit(): void {}

  public create(): void {
    // this.productoService.create(this.producto).subscribe(
    //   response => this.router.navigate(['/productos'])
    // )

    console.log("asdsad");
    console.log(this.producto);
  }
}
