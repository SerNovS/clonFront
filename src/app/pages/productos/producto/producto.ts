import { TipoProducto } from "../tipo/tipo-producto";
import { UnidadMedida } from "./unidadMedida";

export class Producto {

  id:number = 0;
  nombreProducto: string = '';
  imagen: string = '';
  stock: number = 0;
  ultimoPrecioCompra:number = 0;
  ultimoPrecioVenta:number = 0;
  visibilidad: boolean = true;
   unidadMedida : UnidadMedida;
  tipoProducto: TipoProducto;
}
