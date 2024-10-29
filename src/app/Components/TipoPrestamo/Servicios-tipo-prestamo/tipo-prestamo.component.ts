import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoPrestamoService } from '../../../Services/tipo-prestamo.service';
import { TipoCuentaI } from '../../../Models/TipoCuenta';

@Component({
  selector: 'app-crear-tipo-cuenta',
  templateUrl: './crear-tipo-cuenta.component.html',
  styleUrls: ['./crear-tipo-cuenta.component.css']
})
export class CrearTipoCuentaComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tipoPrestamoService: TipoPrestamoService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: TipoCuentaI = this.form.value;
    this.tipoPrestamoService.createTipoPrestamo(formValue).subscribe(
      () => {
        console.log('Tipo de cuenta creado correctamente');
        this.router.navigateByUrl('/tipocuentas');
      },
      err => {
        console.error('Error al crear tipo de cuenta:', err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/tipocuentas');
  }
}


