const prisma = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Carrega as variáveis do .env
dotenv.config()

const registerUser = async (req, res) => {
  const { email, nome, senha  } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  
  try {
    const newUser = await prisma.usuario.create({
      data: {
        email,
        nome,
        senha: hashedPassword,
      },
    });
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }

}

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //res.status(200).json({ message: 'Login realizado com sucesso', user, token });
    res.status(200).json(token);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

module.exports = {
  registerUser,
  loginUser
}