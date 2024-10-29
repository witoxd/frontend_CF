// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router'; 
// import { CardModule } from 'primeng/card';
// import { PanelMenuModule } from 'primeng/panelmenu';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
// import { PrimeIcons, MenuItem } from 'primeng/api';
// import { PrestamoService } from '../../../Services/prestamo.service';
// import { PrestamoI } from '../../../Models/Prestamo';


// @Component({
//   selector: 'app-servicios-Prestamos',
//   standalone: true,
//   imports: [RouterModule,
//     PanelMenuModule,
//     FormsModule,
//     TableModule,
//     CardModule,
//     ButtonModule
//   ],
//   templateUrl: './servicios-prestamo.component.html',
//   styleUrl: './servicios-prestamo.component.css'
// })
// export class serviciosPrestamosComponent implements OnInit {
//   public Prestamos:PrestamoI[] = []
//   constructor(
//     private PrestamoService: PrestamoService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.mostrarPrestamos()
//   }

  

//   mostrarPrestamos() {
//     this.PrestamoService.getAllPrestamo()
//       .subscribe(
//          (data) => {
//           this.Prestamos = data.Prestamos
//           console.log(this.Prestamos)
        
//       })
//   }

//   eliminar(id: number): void{
//     this.router.navigateByUrl('/prestamo');
//     this.PrestamoService.deletePrestamo(id).subscribe(
//       () => {
//         // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Prestamoss Eliminado', life:5000});
//         this.mostrarPrestamos();
//       },
//       err => {
//         console.log('error')
//         this.router.navigateByUrl('/prestamo');

//       }
//     );
//   }

//   actualizarPrestamos(Prestamos: PrestamoI): void {
//     this.PrestamoService.updatePrestamo(Prestamos.id, Prestamos).subscribe(
//       () => {
//         console.log('Prestamoss actualizado correctamente');
//         // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
//       },
//       err => {
//         console.error('Error al actualizar Prestamoss:', err);
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestamoService } from '../../../Services/prestamo.service';
import { PrestamoI } from '../../../Models/Prestamo';
import { TipoPrestamoService } from '../../../Services/tipo-prestamo.service'; // Nuevo servicio para tipos de préstamo
import { TipoPrestamoI } from '../../../Models/TipoPrestamo'; // Modelo para tipos de préstamo
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-servicios-Prestamos',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './servicios-prestamo.component.html',
  styleUrl: './servicios-prestamo.component.css'
})
export class ServiciosPrestamosComponent implements OnInit {
  public Prestamos: PrestamoI[] = [];
  public TipoPrestamos: TipoPrestamoI[] = []; // Almacena los tipos de préstamo

  constructor(
    private prestamoService: PrestamoService,
    private TipoPrestamoService: TipoPrestamoService, // Inyecta el servicio de tipos de préstamo
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarTiposPrestamo(); // Carga los tipos de préstamo primero
    this.mostrarPrestamos();     // Luego carga los préstamos
  }

  mostrarPrestamos(): void {
    this.prestamoService.getAllPrestamo().subscribe({
      next: (data) => {
        this.Prestamos = data.Prestamos;

        // Asegúrate de que TipoPrestamos está cargado antes de asignar el nombre del tipo de préstamo
        this.Prestamos.forEach(prestamo => {
          const tipoPrestamo = this.TipoPrestamos.find(tp => tp.id === prestamo.TipoPrestamoID);
          prestamo['nombreTipoPrestamo'] = tipoPrestamo ? tipoPrestamo.tipo : ''; // Asigna el nombre del tipo de préstamo
        });

        console.log(this.Prestamos);
      },
      error: (err) => {
        console.error('Error al cargar préstamos:', err);
      }
    });
  }

  mostrarTiposPrestamo(): void {
    this.TipoPrestamoService.getAllTipoPrestamo().subscribe({
      next: (data) => {
        this.TipoPrestamos = data.TipoPrestamos;
      },
      error: (err) => {
        console.error('Error al cargar tipos de préstamo:', err);
      }
    });
  }

  actualizarPrestamos(prestamo: PrestamoI): void {
    this.prestamoService.updatePrestamo(prestamo.id, prestamo).subscribe(
      () => {
        console.log('Préstamo actualizado correctamente');
      },
      err => {
        console.error('Error al actualizar préstamo:', err);
      }
    );
  }

  eliminar(id: number): void {
    this.prestamoService.deletePrestamo(id).subscribe(
      () => {
        this.mostrarPrestamos();
      },
      err => {
        console.error('Error al eliminar préstamo:', err);
      }
    );
  }
}
