export interface CitasSelect {
    id_cita: number;
    Fecha_cita: string;
    Hora_cita: string;
    Asitencia_cita: number;
    Evaluaciones: string;
    id_paciente: number;
    Nombre_Completo: string;
}

export interface PagosCarnet {
    NoPago: number;
    FechaPago: string;
    CantidadPago: number;
    ConceptoPago: string;
    NoCita: number;
}
export interface CitasCarnet {
    NoCita: number;
    FechaCita: string;
    HoraCita: string;
    AsistenciaCita: number;
    EvaluacionesCita: string;
    NoPaciente: number;
}
