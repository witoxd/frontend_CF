import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentaI } from '../Models/Cuenta';
@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/cuentas`
  base_path_service = `${this.api_uri_node}/cuenta`
  constructor(
    private http:HttpClient
  ) {}

  getAllCuenta():Observable<{Cuentas:CuentaI[]}>{
    return this.http
      .get<{Cuentas:CuentaI[]}>(this.base_path)
  }


  getOneCuenta(id: number):Observable<CuentaI>{
    return this.http
      .get<CuentaI>(`${this.base_path_service}/${id}`)
  }

  createCuenta(data: any):Observable<CuentaI>{
    return this.http.post<CuentaI>(this.base_path_service, data)
  }

  updateCuenta(id: number, data: any): Observable<CuentaI> {
    return this.http.put<CuentaI>(`${this.base_path_service}/${id}`, data);
  }

  deleteCuenta(id: number): Observable<CuentaI> {
    return this.http.delete<CuentaI>(`${this.base_path_service}/${id}`);
  }
  
}