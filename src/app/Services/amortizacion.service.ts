import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmortizacionI } from '../Models/Amortizacion';
@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/amortizaciones`
  base_path_service = `${this.api_uri_node}/amortizacion`
  constructor(
    private http:HttpClient
  ) {}

  getAllAmortizacion():Observable<{Amortizaciones:AmortizacionI[]}>{
    return this.http
      .get<{Amortizaciones:AmortizacionI[]}>(this.base_path)
  }


  getOneAmortizacion(id: number):Observable<{Amortizaciones:AmortizacionI[]}>{
    return this.http
      .get<{Amortizaciones:AmortizacionI[]}>(`${this.base_path_service}/${id}`)
  }

  createAmortizacion(data: any):Observable<AmortizacionI>{
    return this.http.post<AmortizacionI>(this.base_path_service, data)
  }

  updateAmortizacion(id: number, data: any): Observable<AmortizacionI> {
    return this.http.put<AmortizacionI>(`${this.base_path_service}/${id}`, data);
  }

  deleteAmortizacion(id: number): Observable<AmortizacionI> {
    return this.http.delete<AmortizacionI>(`${this.base_path_service}/${id}`);
  }
  
}