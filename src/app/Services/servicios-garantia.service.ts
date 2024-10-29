import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GarantiaI } from '../Models/Garantia';
@Injectable({
  providedIn: 'root'
})
export class GarantiaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/garantias`
  base_path_service = `${this.api_uri_node}/garantia`
  constructor(
    private http:HttpClient
  ) {}

  getAllGarantia():Observable<{Garantias:GarantiaI[]}>{
    return this.http
      .get<{Garantias:GarantiaI[]}>(this.base_path)
  }


  getOneGarantia(id: number):Observable<{Garantias:GarantiaI[]}>{
    return this.http
      .get<{Garantias:GarantiaI[]}>(`${this.base_path_service}/${id}`)
  }

  createGarantia(data: any):Observable<GarantiaI>{
    return this.http.post<GarantiaI>(this.base_path_service, data)
  }

  updateGarantia(id: number, data: any): Observable<GarantiaI> {
    return this.http.put<GarantiaI>(`${this.base_path_service}/${id}`, data);
  }

  deleteGarantia(id: number): Observable<GarantiaI> {
    return this.http.delete<GarantiaI>(`${this.base_path_service}/${id}`);
  }
  
}