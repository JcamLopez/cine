import { db } from '@/libs/db';
import {peliculaPayload} from '@/schemas/peliculaSchema'
import { PoolConnection } from "mysql2/promise"

export async function registroPelicula(data: peliculaPayload) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await pelicula(data, connection);
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

export async function pelicula(data: peliculaPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO PELICULA (FK_GENERO, NOMBRE) VALUES (?,?)',
        [
            data.genero,
            data.nombre
        ]
    );
}