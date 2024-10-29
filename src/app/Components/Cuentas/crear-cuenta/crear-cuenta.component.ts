// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CuentaService } from '../../../Services/cuenta.service';
// import { CuentaI } from '../../../Models/Cuenta';
// import { RouterModule } from '@angular/router'; 
// import { CardModule } from 'primeng/card';
// import { PanelMenuModule } from 'primeng/panelmenu';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
// import { PrimeIcons, MenuItem } from 'primeng/api';

// @Component({
//   selector: 'app-crear-cuenta',
//   standalone: true,
//   imports: [CommonModule, 
//     ReactiveFormsModule,
//     PanelMenuModule,
//     FormsModule,
//     TableModule,
//     CardModule,
//     ButtonModule],
//   templateUrl: './crear-cuenta.component.html',
//   styleUrls: ['./crear-cuenta.component.css'],
// })
// export class CrearCuentaComponent implements OnInit {
//   public form: FormGroup;
//   private cuentaService = inject(CuentaService);
//   private router = inject(Router);


//   constructor(private formBuilder: FormBuilder) {
//     this.form = this.formBuilder.group({
//       clienteID: ['', [Validators.required]],
//       numero: ['', [Validators.required]],
//       tipocuenta: ['', [Validators.required]],
//       saldo: [0, [Validators.required, Validators.min(0)]], // El saldo debe ser mayor o igual a 0
//     });
//   }

//   ngOnInit() {
//     const id = this.router.snapshot.params['id'];
  
//   }

//   cancel() {
//     this.router.navigateByUrl('/Cuentas'); // Cambia la ruta según sea necesario
//   }

//   onSubmit(): void {
//     const formValue: CuentaI = this.form.value;
//     this.cuentaService.createCuenta(formValue).subscribe(
//       () => {
//         this.router.navigateByUrl('/Cuentas'); // Cambia la ruta según sea necesario
//       },
//       (err) => {
//         console.error(err);
//         console.log('No se ha creado correctamente');}
//     );
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CuentaService } from '../../../Services/cuenta.service';
import { CuentaI } from '../../../Models/Cuenta';
import { TipoCuentaService } from '../../../Services/tipo-cuenta.service';
import { TipoCuentaI } from '../../../Models/TipoCuenta';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [DropdownModule,
    CommonModule, 
    ReactiveFormsModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
})
export class CrearCuentaComponent implements OnInit {
  public form: FormGroup;
  private cuentaService = inject(CuentaService);
  private tipoCuentaService = inject(TipoCuentaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public clienteID!: number;
  public tiposCuentas: { label: string, value: number }[] = [];

  constructor(private formBuilder: FormBuilder) {
    
    this.form = this.formBuilder.group({
      numero: ['', [Validators.required]],
      TipoCuentaID: ['', [Validators.required]],
      saldo: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    // Obtener el clienteID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.clienteID = +params['id']; // Se asume que la URL contiene el clienteID
    });

    // Cargar los tipos de cuenta desde el servicio
    this.tipoCuentaService.getAllTipoCuenta().subscribe(
      (data) => {
        // this.tiposCuenta = data.TipoCuentas;
        this.tiposCuentas = data.TipoCuentas.map(tc => ({
          label: tc.tipo, // Suponiendo que "nombre" es el campo que quieres mostrar
          value: tc.id // Suponiendo que "id" es el identificador del tipo de cuenta
      }));
      },
      (error) => {
        console.error('Error al obtener los tipos de cuenta:', error);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/clientes'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: CuentaI = {
      ...this.form.value,
      clienteID: this.clienteID, // Asignar el clienteID recogido de la URL
    };
    
    console.log('Datos enviados:', formValue); 

    this.cuentaService.createCuenta(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Cuentas'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        console.log('No se ha creado correctamente');
      }
    );
  }
}
