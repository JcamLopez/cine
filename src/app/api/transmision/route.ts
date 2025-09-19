 import { NextResponse } from 'next/server'
import  {transmisionSchema} from '@/schemas/transmisionSchema'
import {registroTransmision} from '@/services/backend/transmisionServices'
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = transmisionSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', detalles: parsed.error.format() },
                { status: 400 }
            );
        }

        const resultado = await registroTransmision(parsed.data)

        return NextResponse.json(
            { mensaje: "Transmisión registrada."},
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en POST /transmision:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

