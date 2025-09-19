import { string, z } from "zod";



export const generoSchema = z.object({
    genero: string().min(1, { message: 'Debe ingresar el genero' }),
});

export type generoPayload = z.infer<typeof generoSchema>;