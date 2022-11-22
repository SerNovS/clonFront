import { TipoProducto } from "../tipo/tipo-producto";

export class Producto {

  id:number = 0;
  nombreProducto: string = '';
  imagen: string = '';
  stock: number = 0;
  unidadMedida : string = '';
  ultimoPrecioCompra:number = 0;
  ultimoPrecioVenta:number = 0;
  visibilidad: boolean = true;
  tipoProducto: TipoProducto;
}
