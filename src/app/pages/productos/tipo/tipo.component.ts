import { Component, OnInit } from '@angular/core';
import { TipoProducto } from './tipo-producto';
import { TipoService } from './tipo.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html'
})
export class TipoComponent implements OnInit {

  tipoProducto: TipoProducto[] = [];

  constructor(private tipoService:TipoService) { }

  ngOnInit(): void {
    this.tipoService.getTipoProducto().subscribe(
      tipoProducto => this.tipoProducto = tipoProducto
    );
  }

}
