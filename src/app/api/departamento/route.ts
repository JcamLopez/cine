

import { NextResponse } from 'next/server'
import { consultarDepartamento } from '@/services/backend/departamentoServices'


export async function GET() {
    try {
        const departamento = await consultarDepartamento()
        return NextResponse.json(departamento)
    } catch (error) {
        return NextResponse.json({ error: "error en el servidor" }, { status: 500 })
    }

}
