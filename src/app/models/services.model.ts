export interface Servicios {
    id_servicio: number;
    Nombre: string;
}
export interface ServicioList {
    Nombre: string;
    id_servicio: number;
    subServicios: SubServicioList[];
}

export interface SubServicioList {
    id_SubServicio: number;
    SubServicio: string;
    precio: number;
    descripcion: string;
}
