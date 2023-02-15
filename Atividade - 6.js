const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb://localhost/crud-alunos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define o esquema do aluno
const alunoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  curso: String,
});

// Define o modelo do aluno
const Aluno = mongoose.model('Aluno', alunoSchema);

// Middleware para análise do corpo da requisição em formato JSON
app.use(bodyParser.json());

// Rota para criar um aluno
app.post('/alunos', async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).send(aluno);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Rota para ler todos os alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.send(alunos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para ler um aluno por ID
app.get('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }
    res.send(aluno);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para atualizar um aluno por ID
app.patch('/alunos/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nome', 'idade', 'curso'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Atualizações inválidas' });
  }

  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }
    res.send(aluno);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Rota para deletar um aluno por ID
app.delete('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }
    res.send(aluno);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
