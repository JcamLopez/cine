import { number, string, z } from "zod";

export const peliculaSchema = z.object({
    genero: string(),
    nombre: string()
});

export type peliculaPayload = z.infer<typeof peliculaSchema>;