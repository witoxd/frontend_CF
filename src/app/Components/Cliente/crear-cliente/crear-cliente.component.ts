import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../Services/Cliente.service';
import { Router } from '@angular/router';
import { ClienteI } from '../../../Models/Cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'] // Cambia styleUrl a styleUrls
})
export class CrearClienteComponent implements OnInit {
  public form: FormGroup;

  clienteService = inject(ClienteService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario aquí
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: ClienteI = this.form.value;
    console.log(formValue);
    this.clienteService.createCliente(formValue).subscribe(
      () => {
        console.log('Cliente creado correctamente');
        this.router.navigateByUrl('clientes');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/clientes');
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get telefono() { return this.form.get('telefono'); }
  get correo() { return this.form.get('correo'); }
  get password() { return this.form.get('password'); }
}

