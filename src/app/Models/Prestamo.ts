export interface PrestamoI {
    id: number;
    clienteID: number;
    empleadoID: number;
    fechaprestamo: Date;
    TipoPrestamoID: number;
    montoprestamo: number;
    interes: number;
    estado: boolean;
    nombreTipoPrestamo: string
}