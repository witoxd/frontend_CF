import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPrestamoI } from '../Models/TipoPrestamo';
@Injectable({
  providedIn: 'root'
})
export class TipoPrestamoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/TipoPrestamos`
  base_path_service = `${this.api_uri_node}/TipoPrestamo`
  constructor(
    private http:HttpClient
  ) {}

  getAllTipoPrestamo():Observable<{TipoPrestamos:TipoPrestamoI[]}>{
    return this.http
      .get<{TipoPrestamos:TipoPrestamoI[]}>(this.base_path)
  }


  getOneTipoPrestamo(id: number):Observable<{TipoPrestamos:TipoPrestamoI[]}>{
    return this.http
      .get<{TipoPrestamos:TipoPrestamoI[]}>(`${this.base_path_service}/${id}`)
  }

  createTipoPrestamo(data: any):Observable<TipoPrestamoI>{
    return this.http.post<TipoPrestamoI>(this.base_path_service, data)
  }

  updateTipoPrestamo(id: number, data: any): Observable<TipoPrestamoI> {
    return this.http.put<TipoPrestamoI>(`${this.base_path_service}/${id}`, data);
  }

  deleteTipoPrestamo(id: number): Observable<TipoPrestamoI> {
    return this.http.delete<TipoPrestamoI>(`${this.base_path_service}/${id}`);
  }
  
}
