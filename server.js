const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escola_db'
});


app.post('/alunos', (req, res) => {
    const { matricula, nome, data_nascimento, turma, email } = req.body;
    const sql = 'INSERT INTO alunos (matricula, nome, data_nascimento, turma, email) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [matricula, nome, data_nascimento, turma, email], (err) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: 'Sucesso!' });
    });
});


app.get('/alunos', (req, res) => {
    db.query('SELECT * FROM alunos', (err, results) => {
        res.json(results);
    });
});

app.listen(3000, () => console.log('Servidor na porta 3000'));