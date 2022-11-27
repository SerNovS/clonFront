import { Producto } from "../producto/producto";


export class Venta {
    id: number = 0;
    precio: number = 0;
    cantidad: number =0;
    fechaCompra: Date;
    producto: Producto;
}