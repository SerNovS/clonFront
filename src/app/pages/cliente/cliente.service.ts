import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { map, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/cliente';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getCliente(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach((cliente) => {});
      }),
      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.nombre =
            cliente.nombre.charAt(0).toUpperCase() + cliente.nombre.slice(1);
          return cliente;
        });
        return response;
      }),
      tap((response: any) => {
        (response.content as Cliente[]).forEach((cliente) => {});
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
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

  getId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (this.isNoAutorizado(e)) {
          return throwError(() => e);
        }
        this.router.navigate(['/cliente']);
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
          text: e.error.mensaje,
        });
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
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

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
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
}
