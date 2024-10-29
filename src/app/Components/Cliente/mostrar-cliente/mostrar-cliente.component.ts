import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../Services/Cliente.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { ClienteI } from '../../../Models/Cliente';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';


@Component({
  selector: 'app-mostrar-cliente',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './mostrar-cliente.component.html',
  styleUrl: './mostrar-cliente.component.css'
})
export class MostrarClienteComponent implements OnInit {
  public clientes:ClienteI[] = []
  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarClientes()
  }

  

  mostrarClientes() {
    this.clienteService.getAllCliente()
      .subscribe({
        next: (data) => {
          this.clientes = data.Clientes
          console.log(this.clientes)
        }
      })
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/clientes');
    this.clienteService.deleteCliente(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.mostrarClientes();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/clientes');

      }
    );
  }

  actualizarCliente(cliente: ClienteI): void {
    this.clienteService.updateCliente(cliente.id, cliente).subscribe(
      () => {
        console.log('Cliente actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar cliente:', err);
      }
    );
  }
}
