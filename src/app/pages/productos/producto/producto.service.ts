import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TipoProducto } from '../tipo/tipo-producto';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlEndPoint: string = 'http://localhost:8080/api/producto';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getProductoSinPagina(): Observable<any> {
    return this.http.get(this.urlEndPoint);
  }

  getProducto(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Producto[]).forEach((producto) => {});
      }),
      map((response: any) => {
        (response.content as Producto[]).map((producto) => {
          producto.nombreProducto =
            producto.nombreProducto.charAt(0).toUpperCase() +
            producto.nombreProducto.slice(1);
          return producto;
        });
        return response;
      }),
      tap((response: any) => {
        (response.content as Producto[]).forEach((producto) => {});
      })
    );
  }

  create(producto: Producto): Observable<Producto> {
    return this.http
      .post<Producto>(this.urlEndPoint, producto, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          if (e.status == 400) {
            return throwError(() => e);
          }
          Swal.fire({
            icon: 'error',
            title: 'Algo ha salido mal',
            text: e.error.mensaje,
          });
          return throwError(() => e);
        })
      );
  }

  getId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (this.isNoAutorizado(e)) {
          return throwError(() => e);
        }
        this.router.navigate(['/producto']);
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
          text: e.error.mensaje,
        });
        return throwError(() => e);
      })
    );
  }

  update(producto: Producto): Observable<Producto> {
    return this.http
      .put<Producto>(`${this.urlEndPoint}/${producto.id}`, producto, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          if (e.status == 400) {
            return throwError(() => e);
          }
          Swal.fire({
            icon: 'error',
            title: 'Algo ha salido mal',
            text: e.error.mensaje,
          });
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Producto> {
    return this.http
      .delete<Producto>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          Swal.fire({
            icon: 'error',
            title: 'Algo ha salido mal',
            text: e.error.mensaje,
          });
          return throwError(() => e);
        })
      );
  }

  getTipoProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.urlEndPoint + '/regiones');
  }
}
