const Aluno = require('../models/aluno');

// Cria um novo aluno
exports.createAluno = async (req, res, next) => {
  try {
    const { nome, idade, curso } = req.body;
    const aluno = await Aluno.create({ nome, idade, curso });
    res.status(201).json(aluno);
  } catch (err) {
    next(err);
  }
};

// Retorna todos os alunos
exports.getAllAlunos = async (req, res, next) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    next(err);
  }
};

// Retorna um aluno pelo ID
exports.getAlunoById = async (req, res, next) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (err) {
    next(err);
  }
};

// Atualiza um aluno pelo ID
exports.updateAlunoById = async (req, res, next) => {
  try {
    const { nome, idade, curso } = req.body;
    const aluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      { nome, idade, curso },
      { new: true, runValidators: true }
    );
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (err) {
    next(err);
  }
};

// Deleta um aluno pelo ID
exports.deleteAlunoById = async (req, res, next) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (err) {
    next(err);
  }
};
