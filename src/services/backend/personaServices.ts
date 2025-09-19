import { db } from '@/libs/db';
import { registro_telefono } from './telefonoServices'
import { personaPayload } from '@/schemas/personaSchema'
import { PoolConnection } from "mysql2/promise"




export async function registroPersona(data: personaPayload) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const id_telefono: number = await registro_telefono(data, connection)
        await persona(data, id_telefono, connection);
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {
        await connection.rollback();
        if (error.code === "ER_DUP_ENTRY") {
            throw new Error("El documento o usuario ya existe");
        }
        throw new Error("Error al registrar: " + error.message);
    } finally {
        connection.release();
    }
}


export async function persona(data: personaPayload, id: number, connection: PoolConnection) {

    await connection.execute(
        'INSERT INTO PERSONA (DOCUMENTO, FK_UBICACION, FK_TELEFONO, NOMBRE_COMPLETO, APELLIDOS) VALUES (?,?,?,?,?)',
        [
            data.documento,
            data.ubicacion,
            id,
            data.nombre,
            data.apellido
        ]
    );
}