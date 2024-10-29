import { Component, OnInit } from '@angular/core';
import { TipoCuentaService } from '../../../Services/tipo-cuenta.service';
import { Router } from '@angular/router';
import { TipoCuentaI } from '../../../Models/TipoCuenta';

@Component({
  selector: 'app-mostrar-tipo-cuenta',
  templateUrl: './mostrar-tipo-cuenta.component.html',
  styleUrls: ['./mostrar-tipo-cuenta.component.css']
})
export class MostrarTipoCuentaComponent implements OnInit {
  public tipoCuentas: TipoCuentaI[] = [];

  constructor(
    private TipoCuentaService: TipoCuentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarTipoCuentas();
  }

  mostrarTipoCuentas(): void {
    this.TipoCuentaService.getAllTipoCuenta()
      .subscribe({
        next: (data) => {
          this.tipoCuentas = data.TipoCuentas;
        },
        error: (err) => {
          console.error('Error al obtener tipos de cuentas:', err);
        }
      });
  }

  eliminar(id: number): void {
    this.TipoCuentaService.deleteTipoCuenta(id).subscribe(
      () => {
        this.mostrarTipoCuentas(); // Actualiza la lista después de eliminar
      },
      err => {
        console.error('Error al eliminar el tipo de cuenta:', err);
      }
    );
  }

  actualizarTipoCuenta(tipoCuenta: TipoCuentaI): void {
    this.TipoCuentaService.updateTipoCuenta(tipoCuenta.id, tipoCuenta).subscribe(
      () => {
        console.log('Tipo de cuenta actualizado correctamente');
      },
      err => {
        console.error('Error al actualizar el tipo de cuenta:', err);
      }
    );
  }
}

