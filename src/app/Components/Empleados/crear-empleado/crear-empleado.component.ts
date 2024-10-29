import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../Services/empleado.service';
import { EmpleadoI } from '../../../Models/Empleado';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
//import { ToastService } from 'primeng/toast';  Asegúrate de importar ToastService si deseas usarlo

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css'],
})
export class CrearEmpleadoComponent implements OnInit {
  public form: FormGroup;
  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);
  // private toastService = inject(ToastService); // Descomentar si deseas usar el servicio de Toast

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      sucursalID: ['', [Validators.required]], // Asegúrate de validar según sea necesario
    });
  }

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl('/Empleados'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: EmpleadoI = this.form.value;
    this.empleadoService.createEmpleado(formValue).subscribe(
      () => {
        // this.toastService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado creado correctamente.' }); // Descomentar si usas el servicio de Toast
        this.router.navigateByUrl('/Empleados'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        // this.toastService.add({ severity: 'error', summary: 'Error', detail: 'No se ha creado correctamente.' }); // Descomentar si usas el servicio de Toast
      }
    );
  }
}
