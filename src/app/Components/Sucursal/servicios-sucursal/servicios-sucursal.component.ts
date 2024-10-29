import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../../Services/sucursal.service';
import { SucursalI } from '../../../Models/Sucursal';
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


@Component({
  selector: 'app-servicios-Sucursal',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './servicios-sucursal.component.html',
  styleUrl: './servicios-sucursal.component.css'
})
export class serviciosSucursalComponent implements OnInit {
  public Sucursales:SucursalI[] = []
  constructor(
    private SucursalService: SucursalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarSucursales()
  }

  

  mostrarSucursales() {
    this.SucursalService.getAllSucursal()
      .subscribe({
        next: (data) => {
          this.Sucursales = data.Sucursales
          console.log(this.Sucursales)
        }
      })
  }

  eliminarSucursal(id: number): void{
    this.router.navigateByUrl('/sucursal');
    this.SucursalService.deleteSucursal(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Sucursal Eliminado', life:5000});
        this.mostrarSucursales();
      },
      err => {
        console.log('error')
        console.log("Tener en cuenta que a la hora de eliminar un Sucursal, no se podrá recuperar la información, tener en cuenta que si se referencia en otra tabla y se intenta eliminar, el sistema retornará un error")
        this.router.navigateByUrl('/sucursal');

      }
    );
  }

  actualizarSucursal(Sucursales: SucursalI): void {
    this.SucursalService.updateSucursal(Sucursales.id, Sucursales).subscribe(
      () => {
        console.log('Sucursal actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar Sucursal:', err);
      }
    );
  }
}
