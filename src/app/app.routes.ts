import { Routes } from '@angular/router';
import { MostrarClienteComponent } from './Components/Cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './Components/Cliente/crear-cliente/crear-cliente.component';
import { serviciosSucursalComponent } from './Components/Sucursal/servicios-sucursal/servicios-sucursal.component';
import { serviciosEmpleadosComponent } from './Components/Empleados/servicios-empleados/servicios-empleados.component';
import { serviciosCuentasComponent } from './Components/Cuentas/servicios-cuentas/servicios-cuentas.component';
import { ServiciosPrestamosComponent } from './Components/Prestamos/servicios-prestamo/servicios-prestamo.component';
import { serviciosAmortizacionesComponent } from './Components/Amortizacion/servicios-amortizacion/servicios-amortizacion.component';
import { CrearAmortizacionComponent } from './Components/Amortizacion/crear-amortizacion/crear-amortizacion.component';
import { CrearCuentaComponent } from './Components/Cuentas/crear-cuenta/crear-cuenta.component';
import { CrearSucursalComponent } from './Components/Sucursal/crear-sucursal/crear-sucursal.component';
import { CrearEmpleadoComponent } from './Components/Empleados/crear-empleado/crear-empleado.component';
import { CrearPrestamoComponent } from './Components/Prestamos/crear-prestamo/crear-prestamo.component';
import { CrearGarantiaComponent } from './Components/Garantia/crear-garantia/crear-garantia.component';
import { ServiciosGarantiaComponent } from './Components/Garantia/servicios-garantia/servicios-garantia.component';
import { ActualizarCuentaComponent } from './Components/Cuentas/actualizar-cuenta/actualizar-cuenta.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: "clientes",
        component: MostrarClienteComponent
    },
    {
        path: "clientes/nuevo",
        component: CrearClienteComponent
    },
    {
        path: "Sucursales",
        component: serviciosSucursalComponent
    },
    {
        path: "Sucursales/nuevo",
        component: CrearSucursalComponent
    },
    {
        path: "Empleados",
        component: serviciosEmpleadosComponent
    },
    {
        path: "Empleados/nuevo",
        component: CrearEmpleadoComponent
    },
    {
        path: "Cuentas",
        component: serviciosCuentasComponent
    },
    {
        path: "Cuentas/nuevo/:id",
        component: CrearCuentaComponent
    },
    {
        path: "Cuentas/Actualizar/:id",
        component: ActualizarCuentaComponent
    },
    {
        path: "Prestamos",
        component: ServiciosPrestamosComponent
    },
    {
        path: "Prestamos/nuevo/:id",
        component: CrearPrestamoComponent
    },
    {
        path: "Amortizaciones",
        component: serviciosAmortizacionesComponent
    },
    {
        path: "Amortizaciones/nuevo",
        component: CrearAmortizacionComponent
    },
    {
        path: "Garantias",
        component: ServiciosGarantiaComponent
    },
    {
        path: "Garantias/nuevo",
        component: CrearGarantiaComponent
    }

];
