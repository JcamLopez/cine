import { db } from '@/libs/db';
import {transmisionPayload} from '@/schemas/transmisionSchema'
import { PoolConnection } from "mysql2/promise"
import { clearScreenDown } from 'readline';

export async function registroTransmision(data: transmisionPayload) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await transmision(data, connection);
        await connection.commit();
        return { mensaje: "Transmisión registrada" };
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

export async function transmision(data: transmisionPayload, connection: PoolConnection) {
    console.log("datos")
    console.log(data)
    await connection.execute(
        'INSERT INTO TRANSMITIR (FK_PELICULA, FK_SALA, HORA_INI, HORA_FIN, DIA, PRECIO, ESTADO) VALUES (?,?,?,?,?,?,?)',
        [
        data.pelicula,
        data.sala,
        data.hora_inicio,
        data.hora_fin,
        data.dia,
        data.precio,
        data.estado
        ]
    );
}