const prisma = require('../config/db')
const criarProduto = async (req, res) => {
  const { nome, descricao } = req.body;
  const usuarioId = req.usuarioLogado.id; // Obtém o ID do usuário logado do token

  try {
    const newProduct = await prisma.coisas.create({
      data: {
        nome,
        descricao,
        usuarioId 
      },
    });
    res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
}

const getProdutos = async (req, res) => {
      const usuarioId = req.usuarioLogado.id; // Obtém o ID do usuário logado do token


  try {
    const produtos = await prisma.coisas.findMany({  
      where: {
        usuarioId: usuarioId
      }
    });
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ message: 'Erro ao obter produtos' });
  }
}

module.exports = {
  criarProduto,
 getProdutos
}
      