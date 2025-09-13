import { number, string, z } from "zod";

export const generoSchema = z.object({
    id:number,
    codigo: number,
    nombre: string
});

export type generoPayload = z.infer<typeof generoSchema>;