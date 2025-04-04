import dbConnect from '../../../lib/dbConnect';
import Dashboard from '../../../models/Dashboard';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const dashboards = await Dashboard.find({});
            return res.status(200).json(dashboards);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar dashboards', error });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
}
