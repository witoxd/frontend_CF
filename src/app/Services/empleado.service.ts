import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoI } from '../Models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/empleados`
  base_path_service = `${this.api_uri_node}/Empleado`
  constructor(
    private http:HttpClient
  ) {}

  getAllEmpleado():Observable<{Empleados:EmpleadoI[]}>{
    return this.http
      .get<{Empleados:EmpleadoI[]}>(this.base_path)
  }


  getOneEmpleado(id: number):Observable<{Empleados:EmpleadoI[]}>{
    return this.http
      .get<{Empleados:EmpleadoI[]}>(`${this.base_path_service}/${id}`)
  }

  createEmpleado(data: any):Observable<EmpleadoI>{
    return this.http.post<EmpleadoI>(this.base_path_service, data)
  }

  updateEmpleado(id: number, data: any): Observable<EmpleadoI> {
    return this.http.put<EmpleadoI>(`${this.base_path_service}/${id}`, data);
  }

  deleteEmpleado(id: number): Observable<EmpleadoI> {
    return this.http.delete<EmpleadoI>(`${this.base_path_service}/${id}`);
  }
  
}


