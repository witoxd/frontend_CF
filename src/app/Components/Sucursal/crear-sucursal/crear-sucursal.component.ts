import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SucursalService } from '../../../Services/sucursal.service';
import { SucursalI } from '../../../Models/Sucursal';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
//import { ToastService } from 'primeng/toast';  Asegúrate de importar ToastService si deseas usarlo

@Component({
  selector: 'app-crear-sucursal',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './crear-sucursal.component.html',
  styleUrls: ['./crear-sucursal.component.css'],
})
export class CrearSucursalComponent implements OnInit {
  public form: FormGroup;
  private sucursalService = inject(SucursalService);
  private router = inject(Router);
  // private toastService = inject(ToastService); // Descomentar si deseas usar el servicio de Toast

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl('/Sucursales'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: SucursalI = this.form.value;
    this.sucursalService.createSucursal(formValue).subscribe(
      () => {
        // this.toastService.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal creada correctamente.' }); // Descomentar si usas el servicio de Toast
        this.router.navigateByUrl('/Sucursales'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        // this.toastService.add({ severity: 'error', summary: 'Error', detail: 'No se ha creado correctamente.' }); // Descomentar si usas el servicio de Toast
      }
    );
  }
}

