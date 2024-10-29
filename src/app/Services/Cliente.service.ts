import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteI } from '../Models/Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/clientes`
  base_path_service = `${this.api_uri_node}/cliente`
  constructor(
    private http:HttpClient
  ) {}

  getAllCliente():Observable<{Clientes:ClienteI[]}>{
    return this.http
      .get<{Clientes:ClienteI[]}>(this.base_path)
  }


  getOneCliente(id: number):Observable<{cliente:ClienteI[]}>{
    return this.http
      .get<{cliente:ClienteI[]}>(`${this.base_path_service}/${id}`)
  }

  createCliente(data: any):Observable<ClienteI>{
    return this.http.post<ClienteI>(this.base_path_service, data)
  }

  updateCliente(id: number, data: any): Observable<ClienteI> {
    return this.http.put<ClienteI>(`${this.base_path_service}/${id}`, data);
  }

  deleteCliente(id: number): Observable<ClienteI> {
    return this.http.delete<ClienteI>(`${this.base_path_service}/${id}`);
  }
  
}


