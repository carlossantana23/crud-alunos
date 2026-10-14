const express = require('express');
const db = require('./config/db');

const app = express();
app.use(express.json());


app.post('/alunos', async (req, res) => {
  const { nome, email, idade } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO alunos (nome, email, idade) VALUES (?, ?, ?)',
      [nome, email, idade]
    );
    res.status(201).json({ 
      mensagem: 'Aluno cadastrado com sucesso!', 
      id: result.insertId 
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


app.get('/alunos', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, nome, email, idade FROM alunos');
    res.json(rows);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.listen(3000, () => console.log('API a correr em http://localhost:3000'));