export interface Usuario {
    correo: string;
    id: number;
    nombre: string;
    pass: string;
}

export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    lote: string;
    caducidad?: Date;
}

export interface Movimiento {
    id?: number;
    tipo: string;
    cantidad?: number;
    motivo?: string;
    fecha?: number;
    sumatoria?: number;
    productoId?: Producto;
    usuarioId?: Usuario;
}


export interface CUDResponse{
    id: number;
    ok: boolean;
    tipo: string;
    codigo: number;
    mensaje: string;
}
