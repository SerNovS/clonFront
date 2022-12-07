import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Venta } from './venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private urlEndPoint: string =`http://localhost:8080/api/precioVenta`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getListaPrecioVenta(): Observable<Venta[]>{
    return this.http.get<Venta[]>(`${this.urlEndPoint}`);
  }

  crearNuevoPrecioVenta(venta: Venta): Observable<Venta>{
    return this.http
      .post<Venta>(this.urlEndPoint, venta);
  }
}
