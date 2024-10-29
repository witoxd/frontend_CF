
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarantiaService } from '../../../Services/servicios-garantia.service';
import { Router } from '@angular/router';
import { GarantiaI } from '../../../Models/Garantia';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-crear-garantia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-garantia.component.html',
  styleUrl: './crear-garantia.component.css'
})
export class CrearGarantiaComponent {
  public form: FormGroup;

  GarantiaService = inject(GarantiaService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario aquí
    this.form = this.formBuilder.group({
      prestamosID: ['', [Validators.required]],
      tipogarantia: ['', [Validators.required]],
      valorgarantia: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: GarantiaI = this.form.value;
    console.log(formValue);
    this.GarantiaService.createGarantia(formValue).subscribe(
      () => {
        console.log('Garantia creado correctamente');
        this.router.navigateByUrl('Garantias');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/Garantias');
  }

  get prestamosID() { return this.form.get('prestamosID'); }
  get tipogarantia() { return this.form.get('tipogarantia'); }
  get valorgarantia() { return this.form.get('valorgarantia'); }
  get descripcion() { return this.form.get('descripcion'); }
}
