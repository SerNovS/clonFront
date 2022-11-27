import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Compra } from './compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private urlEndPoint: string =`http://localhost:8080/api/precioCompra`;

  constructor(private http: HttpClient, private router: Router) { }

  getListaPrecioCmopra(): Observable<Compra[]>{
    return this.http.get<Compra[]>(`${this.urlEndPoint}`);
  }
}
