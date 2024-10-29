import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCuentaI } from '../Models/TipoCuenta';
@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/TipoCuentas`
  base_path_service = `${this.api_uri_node}/TipoCuenta`
  
  constructor(
    private http:HttpClient
  ) {}

  getAllTipoCuenta():Observable<{TipoCuentas:TipoCuentaI[]}>{
    return this.http
      .get<{TipoCuentas:TipoCuentaI[]}>(this.base_path)
  }


  getOneTipoCuenta(id: number):Observable<{TipoCuentas:TipoCuentaI[]}>{
    return this.http
      .get<{TipoCuentas:TipoCuentaI[]}>(`${this.base_path_service}/${id}`)
  }

  createTipoCuenta(data: any):Observable<TipoCuentaI>{
    return this.http.post<TipoCuentaI>(this.base_path_service, data)
  }

  updateTipoCuenta(id: number, data: any): Observable<TipoCuentaI> {
    return this.http.put<TipoCuentaI>(`${this.base_path_service}/${id}`, data);
  }

  deleteTipoCuenta(id: number): Observable<TipoCuentaI> {
    return this.http.delete<TipoCuentaI>(`${this.base_path_service}/${id}`);
  }
  
}
