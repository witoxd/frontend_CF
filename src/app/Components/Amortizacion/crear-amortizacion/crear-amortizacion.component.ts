import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmortizacionService } from '../../../Services/amortizacion.service';
import { AmortizacionI } from '../../../Models/Amortizacion';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-amortizacion',
  standalone: true,
  imports: [CommonModule, 
    CardModule, 
    PanelMenuModule, 
    TableModule, 
    ButtonModule, 
    ReactiveFormsModule],
  templateUrl: './crear-amortizacion.component.html',
  styleUrls: ['./crear-amortizacion.component.css'],
})
export class CrearAmortizacionComponent implements OnInit {
  public form: FormGroup;
  private amortizacionService = inject(AmortizacionService);
  private router = inject(Router);

  /**
   * Constructor que inicializa el formulario de creación de amortización
   * con los campos prestamosID, fecha, monto y estado.
   * @param formBuilder Inyección del FormBuilder para crear el formulario
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      prestamosID: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      estado: [true], // Valor por defecto
    });
  }

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl('/Amortizaciones'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: AmortizacionI = this.form.value;
    this.amortizacionService.createAmortizacion(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Amortizaciones'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        console.log('No se ha creado correctamente');}
    );
  }
}

