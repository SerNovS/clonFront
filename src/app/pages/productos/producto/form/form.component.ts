import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoProducto } from '../../tipo/tipo-producto';
import { UnidadMedida } from '../unidadMedida';
import { VentaService } from '../../venta/venta.service';
import { CompraService } from '../../compra/compra.service';
import { Venta } from '../../venta/venta';
import { Compra } from '../../compra/compra';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Nuevo Producto';

  public producto: Producto = new Producto();
  tiposProducto:TipoProducto[];
  unidadesMedida:UnidadMedida[];

  public errores: string[] = [];

  venta:Venta;
  compra:Compra;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ventaService: VentaService,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
    this.cargarTipos();
    this.cargarUnidades();
  }

  cargarTipos(): void {
    this.productoService.getTipoProducto().subscribe(tipos =>{
      this.tiposProducto = tipos;
    })
  }
  cargarUnidades(): void {
    this.productoService.getUnidadMedida().subscribe(unidades =>{
      this.unidadesMedida = unidades;
    })
  }

  crearProducto(): void {
    this.productoService.create(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto creado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    );
      this.crearCompraVenta();
  }

  cargarProducto(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.getId(id).subscribe((producto) => {
          this.producto = producto;
        });
      }
    });
  }

  update(): void {
    this.productoService.update(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['productos']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto actualizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
      }
    );
  }

  compararTipo(o1:TipoProducto,o2:TipoProducto){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined ? false: o1.idTipoProducto === o2.idTipoProducto;
  }

  compararUnidad(o1:UnidadMedida,o2:UnidadMedida){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined ? false: o1.idUnidadMedida === o2.idUnidadMedida;
  }

  crearCompraVenta(){
    
    this.venta.cantidad=0;
    this.venta.fechaVenta=new Date;
    this.venta.precio=this.producto.ultimoPrecioVenta;
    this.venta.producto=this.producto;
    this.ventaService.crearNuevoPrecioVenta(this.venta);

    
    this.compra.cantidad=this.producto.stock;
    this.compra.fechaCompra=new Date;
    this.compra.precio=this.producto.ultimoPrecioCompra;
    this.compra.producto=this.producto;
    this.compraService.crearNuevoPrecioCompra(this.compra);
  }
  }
 
