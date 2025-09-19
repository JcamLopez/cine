
import { registroPersona } from '@/services/backend/personaServices';
import { personaSchema } from '@/schemas/personaSchema'
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body)
        console.log("body")
        console.log(body)
        const parsed = personaSchema.safeParse(body);
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww")
        console.log(parsed)
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', detalles: parsed.error.format() },
                { status: 400 }
            );
        }
        registroPersona(parsed.data)
        return NextResponse.json(
            { mensaje: "Persona registrada correctamente" },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en POST /persona:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

