import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TipoProducto } from './tipo-producto';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private urlEndPoint: string = 'http://localhost:8080/api/tipoproducto';

  constructor(private http: HttpClient) {}

  getTipoProducto(): Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>(this.urlEndPoint);
  }
}
