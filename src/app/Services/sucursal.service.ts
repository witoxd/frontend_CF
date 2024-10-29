import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SucursalI } from '../Models/Sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/sucursales`
  base_path_service = `${this.api_uri_node}/sucursal`
  constructor(
    private http:HttpClient
  ) {}

  getAllSucursal():Observable<{Sucursales:SucursalI[]}>{
    return this.http
      .get<{Sucursales:SucursalI[]}>(this.base_path)
  }


  getOneSucursal(id: number):Observable<{Sucursales:SucursalI[]}>{
    return this.http
      .get<{Sucursales:SucursalI[]}>(`${this.base_path_service}/${id}`)
  }

  createSucursal(data: any):Observable<SucursalI>{
    return this.http.post<SucursalI>(this.base_path_service, data)
  }

  updateSucursal(id: number, data: any): Observable<SucursalI> {
    return this.http.put<SucursalI>(`${this.base_path_service}/${id}`, data);
  }


  deleteSucursal(id: number): Observable<SucursalI> {
    return this.http.delete<SucursalI>(`${this.base_path_service}/${id}`);
  }
  
}


