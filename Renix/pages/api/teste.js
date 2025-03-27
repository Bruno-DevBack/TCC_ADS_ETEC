import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bundademacaco'
});

export default function handler(req, res){
    connection.query('SELECT * FROM usuario', (error, results) =>{
        if (error){
            console.error('Erro na consulta:', error);
            return res.status(500).json({ error: 'Erro ao buscar dados.'});
        }
        res.status(200).json(results);
    });
}