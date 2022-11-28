import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/pages/login/token.service';
import Swal from 'sweetalert2';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
})
export class SubirFotoComponent implements OnInit {
  titulo: String = 'Subir foto';
  producto: Producto;
  isAdmin = false;
  private fotoSeleccionada: File;
  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id');
      if (id) {
        this.productoService.getId(id).subscribe((producto) => {
          this.producto = producto;
        });
      }
    });
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    // console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.productoService
      .subirFoto(this.fotoSeleccionada, this.producto.id)
      .subscribe((producto) => {
        this.producto = producto;
        Swal.fire(
          'EXITO!',
          'La foto se ha subido completamente!',
          'success'
        );
        // console.log(this.producto);
        this.router.navigate(['/productos']);
      });
  }
}
