
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
  selector: 'app-actualizar-cuenta',
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
  templateUrl: './actualizar-cuenta.component.html',
  styleUrl: './actualizar-cuenta.component.css'
})
export class ActualizarCuentaComponent {
  public form: FormGroup;
  private cuentaService = inject(CuentaService);
  private tipoCuentaService = inject(TipoCuentaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public clienteID!: number;
  public cuentaID!: number; // ID de la cuenta para actualizar
  public tiposCuentas: { label: string, value: number }[] = [];
  public cuenta: CuentaI[] = []

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      numero: ['', [Validators.required]],
      TipoCuentaID: ['', [Validators.required]],
      saldo: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    // Obtener el clienteID y cuentaID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.cuentaID = +params['id']; // Se asume que la URL contiene el cuentaID
    });

    // Cargar los tipos de cuenta desde el servicio
    this.tipoCuentaService.getAllTipoCuenta().subscribe(
      (data) => {
        this.tiposCuentas = data.TipoCuentas.map(tc => ({
          label: tc.tipo,
          value: tc.id
        }));
      },
      (error) => {
        console.error('Error al obtener los tipos de cuenta:', error);
      }
    );

    // Cargar los datos de la cuenta existente
    this.cuentaService.getOneCuenta(this.cuentaID).subscribe(
      (data) => {
        const cuenta = data; // Suponiendo que obtienes un array dentro de 'Cuentas'
        if (cuenta) {
          this.form.patchValue({
            numero: cuenta.numero,
            TipoCuentaID: cuenta.TipoCuentaID,
            saldo: cuenta.saldo
          });
        } else {
          console.error('No se encontró la cuenta con la ID proporcionada');
        }
      },
      (error) => {
        console.error('Error al cargar los datos de la cuenta:', error);
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

    this.cuentaService.updateCuenta(this.cuentaID, formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Cuentas'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }
}
