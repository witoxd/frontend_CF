import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrestamoI } from '../Models/Prestamo';
@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/prestamos`
  base_path_service = `${this.api_uri_node}/prestamo`
  constructor(
    private http:HttpClient
  ) {}

  getAllPrestamo():Observable<{Prestamos:PrestamoI[]}>{
    return this.http
      .get<{Prestamos:PrestamoI[]}>(this.base_path)
  }


  getOnePrestamo(id: number):Observable<{Prestamos:PrestamoI[]}>{
    return this.http
      .get<{Prestamos:PrestamoI[]}>(`${this.base_path_service}/${id}`)
  }

  createPrestamo(data: any):Observable<PrestamoI>{
    return this.http.post<PrestamoI>(this.base_path_service, data)
  }

  updatePrestamo(id: number, data: any): Observable<PrestamoI> {
    return this.http.put<PrestamoI>(`${this.base_path_service}/${id}`, data);
  }

  deletePrestamo(id: number): Observable<PrestamoI> {
    return this.http.delete<PrestamoI>(`${this.base_path_service}/${id}`);
  }
  
}
