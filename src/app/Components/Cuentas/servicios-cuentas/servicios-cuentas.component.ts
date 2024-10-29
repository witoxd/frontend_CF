import { Component, OnInit, inject } from '@angular/core';
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
import { CuentaService } from '../../../Services/cuenta.service';
import { CuentaI } from '../../../Models/Cuenta';
import { TipoCuentaService } from '../../../Services/tipo-cuenta.service';
import { TipoCuentaI } from '../../../Models/TipoCuenta';


@Component({
  selector: 'app-servicios-Cuentas',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './servicios-cuentas.component.html',
  styleUrl: './servicios-cuentas.component.css'
})
export class serviciosCuentasComponent implements OnInit {
  public Cuentas:CuentaI[] = []
  public TipoCuentas:TipoCuentaI[] = []
  constructor(
    private CuentaService: CuentaService,
    private router: Router,
private TipoCuentaService: TipoCuentaService
  ) { }

  ngOnInit(): void {
    this.MostrarUnTipoCuenta(); // Cargar los tipos de cuenta primero
    this.mostrarCuentas();      // Luego cargar las cuentas
  }

  

  mostrarCuentas() {
    this.CuentaService.getAllCuenta()
      .subscribe({
        next: (data) => {
          this.Cuentas = data.Cuentas;
  
          // Asegúrate de que TipoCuentas está cargado antes de asignar el nombre del tipo de cuenta
          this.Cuentas.forEach(cuenta => {
            const tipoCuenta = this.TipoCuentas.find(tc => tc.id === cuenta.TipoCuentaID);
            cuenta['nombreTipoCuenta'] = tipoCuenta ? tipoCuenta.tipo : ''; // Asigna el nombre del tipo de cuenta
          });
  
          console.log(this.Cuentas);
        }
      });
  }
  
  


  MostrarUnTipoCuenta(){
    this.TipoCuentaService.getAllTipoCuenta().subscribe(
      (data) => {
this.TipoCuentas = data.TipoCuentas
      },
      (error) => {
        console.error('Error al obtener los tipos de cuenta:', error);
      }
    );
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/Cuentas');
    this.CuentaService.deleteCuenta(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cuentass Eliminado', life:5000});
        this.mostrarCuentas();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Cuentas');

      }
    );
  }

  actualizarCuentas(Cuentas: CuentaI): void {
    this.CuentaService.updateCuenta(Cuentas.id, Cuentas).subscribe(
      () => {
        console.log('Cuentass actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar Cuentass:', err);
      }
    );
  }
}
