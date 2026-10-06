const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    console.log('JWT_SECRET:', process.env.JWT_SECRET); //
    const token = req.headers.authorization?.split(' ')[1]; // Pega o token do cabeçalho Authorization
    if (!token) {
        return res.status(401).json({ message: 'Não autorizado' });

    }

    try {
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioLogado = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message, message: 'Token inválido' });
    }   
}

module.exports = auth;