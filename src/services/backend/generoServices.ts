import { db } from '@/libs/db';

export async function insertarGenero(genero: string) {
  try {
    const query = 'INSERT INTO GENERO (GENERO) VALUES (?)';
    const [result] = await db.execute(query, [genero]);

    return {
      mensaje: 'Genero insertado correctamente',
      idInsertado: (result as any).insertId,
    };
  } catch (error) {
    console.error('Error al insertar tipo de documento:', error);
    throw new Error('No se pudo insertar el tipo de documento');
  }
}