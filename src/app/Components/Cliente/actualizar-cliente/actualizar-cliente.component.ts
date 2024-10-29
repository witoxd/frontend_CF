import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../Services/Cliente.service';
import { ClienteI } from '../../../Models/Cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css'] 
})
export class ActualizarClienteComponent implements OnInit {
  public form: FormGroup;

  clienteService = inject(ClienteService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getCliente(id);
  }

  getCliente(id: number) {
    this.clienteService.getOneCliente(id)
      .subscribe({
        next: (data) => {
          this.form.setValue(data.cliente);
        },
        error: (err) => {
          console.error('Error al obtener cliente:', err);
          // Manejo adicional de errores (notificaciones, etc.)
        }
      });
  }

  onSubmit(): void {
    const formValue: ClienteI = this.form.value;
    const id: number = this.form.value.id;
    this.clienteService.updateCliente(id, formValue).subscribe(
      () => {
        console.log('Cliente actualizado correctamente');
        this.router.navigateByUrl('clientes');
      },
      err => {
        console.error('Error al actualizar cliente:', err);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/clientes');
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); } // Corregido el nombre
  get telefono() { return this.form.get('telefono'); }
  get correo() { return this.form.get('correo'); }
  get password() { return this.form.get('password'); }
}
