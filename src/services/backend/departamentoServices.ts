import { db } from '@/libs/db';

export async function consultarDepartamento() {
    try {
        const [rows] = await db.query('SELECT D.ID_DEPARTAMENTO AS ID, D.NOMBRE AS N, D.CODIGO AS C FROM DEPARTAMENTO AS D')
        const tipos = (rows as any[]).map((row) => ({

            id: row.ID,
            nombre: row.N,
            codigo: row.c
        }))
        return tipos
    } catch (error) {
        throw new Error("No se pudo cargar el departamento ")
    }
}