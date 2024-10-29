import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { EmpleadoService } from '../../../Services/empleado.service';
import { EmpleadoI } from '../../../Models/Empleado';


@Component({
  selector: 'app-servicios-Empleados',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './servicios-empleados.component.html',
  styleUrl: './servicios-empleados.component.css'
})
export class serviciosEmpleadosComponent implements OnInit {
  public Empleados:EmpleadoI[] = []
  constructor(
    private EmpleadoService: EmpleadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarEmpleados()
  }

  

  mostrarEmpleados() {
    this.EmpleadoService.getAllEmpleado()
      .subscribe({
        next: (data) => {
          this.Empleados = data.Empleados
          console.log(this.Empleados)
        }
      })
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/Empleados');
    this.EmpleadoService.deleteEmpleado(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Empleados Eliminado', life:5000});
        this.mostrarEmpleados();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Empleados');

      }
    );
  }

  actualizarEmpleados(Empleadoses: EmpleadoI): void {
    this.EmpleadoService.updateEmpleado(Empleadoses.id, Empleadoses).subscribe(
      () => {
        console.log('Empleados actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar Empleados:', err);
      }
    );
  }
}
