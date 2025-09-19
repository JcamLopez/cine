import { string, z } from "zod";



export const personaSchema = z.object({
    documento: string().min(1, { message: 'Debe ingresar el genero' }),
    nombre: string().min(1, { message: 'Debe ingresar el genero' }),
    apellido: string().min(1, { message: 'Debe ingresar el genero' }),
    telefono: string().min(1, { message: 'Debe ingresar el genero' }),

});

export type personaPayload = z.infer<typeof personaSchema>;