import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  items: MenuItem[] = [];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        color: 'blue',
        routerLink: '/clientes',
      },
      {
        label: 'Cuenta',
        icon: 'pi pi-fw pi-users',
        routerLink: '/Cuentas'
      },
      // {
      //   label: 'Empresarios',
      //   icon: 'pi pi-fw pi-qrcode',
      //   items: [
      //     {
      //       label: 'Sucursales',
      //       icon: 'pi pi-fw pi-building',
      //       items: [
      //         {
      //           label: 'Mostrar',
      //           routerLink: '/Sucursales'
      //         },
      //         {
      //           label: 'Crear',
      //           routerLink: '/sucursales/nuevo'
      //         }
      //       ]
      //     },
      //     {
      //       label: 'Mostrar',
      //       routerLink: '/Empleados'

      //     },
      //     {
      //       label: 'Crear',
      //       // routerLink: '/Empleados/nuevo'
      //     }
      //   ]
      // },
      {
        label: 'Prestamos',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/Prestamos'
      },
      {
        label: 'Amortizaciones',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/Amortizaciones'
      },
      {
        label: 'Garantias',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/Garantias'

      },
    ];
  }
}
