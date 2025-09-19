import { personaPayload } from '@/schemas/personaSchema'
import { PoolConnection } from "mysql2/promise"
import { ResultSetHeader } from "mysql2";
/* 
export async function registro_telefono(data: personaPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO TELEFONO (NUMERO) VALUES (?)',
        [
            data.telefono
        ]
    );
}
 */
export async function registro_telefono(data: personaPayload, connection: PoolConnection): Promise<number> {
    const [result] = await connection.execute<ResultSetHeader>(
        'INSERT INTO TELEFONO (NUMERO) VALUES (?)',
        [data.telefono]
    );

    return result.insertId;
}
