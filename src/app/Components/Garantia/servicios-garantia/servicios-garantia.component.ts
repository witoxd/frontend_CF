
import { Component, OnInit } from '@angular/core';
import { GarantiaService } from '../../../Services/servicios-garantia.service';
import { Router } from '@angular/router';
import { GarantiaI } from '../../../Models/Garantia';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router'; 
import { ClienteI } from '../../../Models/Cliente';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios-garantia',
  standalone: true,
  imports: [TableModule, 
    
    ButtonModule,   
    FormsModule, 
    CardModule, 
    PanelMenuModule, 
    RouterModule,
    CommonModule],
  templateUrl: './servicios-garantia.component.html',
  styleUrl: './servicios-garantia.component.css'
})
export class ServiciosGarantiaComponent implements OnInit {

  public garantias: GarantiaI[] = [];

  constructor(
    private garantiaService: GarantiaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarGarantias();
  }

  mostrarGarantias() {
    this.garantiaService.getAllGarantia()
      .subscribe({
        next: (data) => {
          this.garantias = data.Garantias;
          console.log(this.garantias);
        }
      });
  }

  eliminar(id: number): void {
    this.garantiaService.deleteGarantia(id).subscribe(
      () => {
        this.mostrarGarantias();
      },
      err => {
        console.log('Error al eliminar');
      }
    );
  }

  actualizarGarantia(garantia: GarantiaI): void {
    this.garantiaService.updateGarantia(garantia.id, garantia).subscribe(
      () => {
        console.log('Garantía actualizada correctamente');
      },
      err => {
        console.error('Error al actualizar garantía:', err);
      }
    );
  }

}
