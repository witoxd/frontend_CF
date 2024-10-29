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
import { AmortizacionService } from '../../../Services/amortizacion.service';
import { AmortizacionI } from '../../../Models/Amortizacion';

@Component({
  selector: 'app-servicios-Amortizaciones',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './servicios-amortizacion.component.html',
  styleUrl: './servicios-amortizacion.component.css'
})
export class serviciosAmortizacionesComponent implements OnInit {
  public Amortizaciones:AmortizacionI[] = []
  constructor(
    private AmortizacionService: AmortizacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarAmortizaciones()
  }

  

  mostrarAmortizaciones() {
    this.AmortizacionService.getAllAmortizacion()
      .subscribe(
         (data) => {
          this.Amortizaciones = data.Amortizaciones
          console.log(this.Amortizaciones)
        
      })
  }

  eliminar(id: number): void{
    this.AmortizacionService.deleteAmortizacion(id).subscribe(
      () => {
        this.mostrarAmortizaciones()

        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Amortizacioness Eliminado', life:5000});
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Amortizaciones');

      }
    );
  }

  actualizarAmortizaciones(Amortizaciones: AmortizacionI): void {
    this.AmortizacionService.updateAmortizacion(Amortizaciones.id, Amortizaciones).subscribe(
      () => {
        console.log('Amortizaciones actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar Amortizaciones:', err);
      }
    );
  }
}