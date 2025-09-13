import { NextResponse } from 'next/server'

import { generoSchema } from '@/schemas/generoSchema';
import { insertarGenero } from '@/services/backend/genero';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = generoSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', detalles: parsed.error.format() },
                { status: 400 }
            );
        }

        const { genero } = parsed.data;
        const resultado = await insertarGenero(genero);

        return NextResponse.json(
            { mensaje: resultado.mensaje, id: resultado.idInsertado },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en POST /genero:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
