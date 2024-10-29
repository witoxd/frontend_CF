// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { PrestamoService } from '../../../Services/prestamo.service';
// import { PrestamoI } from '../../../Models/Prestamo';
// import { CardModule } from 'primeng/card';
// import { ButtonModule } from 'primeng/button';
// //import { ToastService } from 'primeng/toast';  Asegúrate de importar ToastService si deseas usarlo

// @Component({
//   selector: 'app-crear-prestamo',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     CardModule,
//     ButtonModule,
//   ],
//   templateUrl: './crear-prestamo.component.html',
//   styleUrls: ['./crear-prestamo.component.css'],
// })
// export class CrearPrestamoComponent implements OnInit {
//   public form: FormGroup;
//   private prestamoService = inject(PrestamoService);
//   private router = inject(Router);
//   // private toastService = inject(ToastService); // Descomentar si deseas usar el servicio de Toast

//   constructor(private formBuilder: FormBuilder) {
//     this.form = this.formBuilder.group({
//       clienteID: ['', [Validators.required]],
//       empleadoID: ['', [Validators.required]],
//       fechaprestamo: ['', [Validators.required]],
//       tipoprestamo: ['', [Validators.required]],
//       montoprestamo: [0, [Validators.required, Validators.min(0)]], // El monto debe ser mayor o igual a 0
//       interes: [0, [Validators.required, Validators.min(0)]], // El interés debe ser mayor o igual a 0
//       estado: [true, [Validators.required]], // Estado por defecto a "true"
//     });
//   }

//   ngOnInit() {}

//   cancel() {
//     this.router.navigateByUrl('/Prestamos'); // Cambia la ruta según sea necesario
//   }

//   onSubmit(): void {
//     const formValue: PrestamoI = this.form.value;
//     this.prestamoService.createPrestamo(formValue).subscribe(
//       () => {
//         // this.toastService.add({ severity: 'success', summary: 'Éxito', detail: 'Préstamo creado correctamente.' }); // Descomentar si usas el servicio de Toast
//         this.router.navigateByUrl('/Prestamos'); // Cambia la ruta según sea necesario
//       },
//       (err) => {
//         console.error(err);
//         // this.toastService.add({ severity: 'error', summary: 'Error', detail: 'No se ha creado correctamente.' }); // Descomentar si usas el servicio de Toast
//       }
//     );
//   }
// }



import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute añadido para obtener el clienteID
import { PrestamoService } from '../../../Services/prestamo.service';
import { TipoPrestamoService } from '../../../Services/tipo-prestamo.service';  // Nuevo servicio para tipos de préstamos
import { PrestamoI } from '../../../Models/Prestamo';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-crear-prestamo',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './crear-prestamo.component.html',
  styleUrls: ['./crear-prestamo.component.css'],
})
export class CrearPrestamoComponent implements OnInit {
  public form: FormGroup;
  private prestamoService = inject(PrestamoService);
  private tipoPrestamoService = inject(TipoPrestamoService);  // Servicio de tipo préstamo
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);  // Para obtener el clienteID de la URL
  public clienteID!: number;
  public tiposPrestamos: { label: string, value: number }[] = []; // Opciones del dropdown de tipos de préstamo

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      clienteID: ['', [Validators.required]],
      fechaprestamo: ['', [Validators.required]],
      TipoPrestamoID: ['', [Validators.required]],  // Nuevo campo para tipo de préstamo
      montoprestamo: [0, [Validators.required, Validators.min(0)]],
      interes: [0, [Validators.required, Validators.min(0)]],
      estado: [true, [Validators.required]],
    });
  }

  ngOnInit() {
    // Obtener el clienteID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.clienteID = +params['id']; // Se asume que la URL contiene el clienteID
    });

    // Cargar los tipos de préstamo desde el servicio
    this.tipoPrestamoService.getAllTipoPrestamo().subscribe(
      (data) => {
        this.tiposPrestamos = data.TipoPrestamos.map(tp => ({
          label: tp.tipo, // Campo que muestra el tipo de préstamo
          value: tp.id   // Campo que representa el valor del tipo de préstamo
        }));
      },
      (error) => {
        console.error('Error al obtener los tipos de préstamo:', error);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/Prestamos'); // Navega a la ruta de préstamos
  }

  onSubmit(): void {
    const formValue: PrestamoI = {
      ...this.form.value,
      clienteID: this.clienteID, // Asignar el clienteID recogido de la URL
    };

    this.prestamoService.createPrestamo(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Prestamos'); // Navega a la ruta de préstamos
      },
      (err) => {
        console.error('Error al crear el préstamo:', err);
      }
    );
  }
}

