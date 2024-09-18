import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../data/db.json';  // Importa o arquivo JSON diretamente

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(db.notas);  // Retorna as notas fiscais
}
