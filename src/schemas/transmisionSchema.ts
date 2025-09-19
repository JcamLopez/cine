import { boolean, number, string, z } from "zod";

export const transmisionSchema = z.object({
    pelicula:number(),
    sala:string(),
    hora_inicio:string(),
    hora_fin:string(),
    dia:string(),
    precio:string(),
    estado:boolean()
});

export type transmisionPayload = z.infer<typeof transmisionSchema>;