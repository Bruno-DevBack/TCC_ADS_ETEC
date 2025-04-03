import mongoose from 'mongoose';
import Bancos from './Bancos'; // Certifique-se de que o caminho esteja correto
import Usuario from './Usuarios'; // Certifique-se de que o caminho esteja correto

async function testarChaveEstrangeira() {
  try {
    // Conectando ao MongoDB
    await dbConnect();

    console.log('Conectado ao MongoDB');

    // Criando um novo usuário
    const novoUsuario = new Usuario({
      nome: 'João Silva',
      email: 'joao.silva@email.com',
    });
    await novoUsuario.save();
    console.log('Usuário criado:', novoUsuario);

    // Criando um novo banco e associando ao usuário
    const novoBanco = new Banco({
      nome_banco: 'Banco do Brasil',
      IOF_diario: 5.3,
      cdi: 13.2,
      IR_ate_180_dias: 15,
      IR_ate_360_dias: 20,
      IR_ate_720_dias: 25,
      IR_acima_720_dias: 30,
      usuario: novoUsuario._id, // Associando o usuário ao banco
    });
    await novoBanco.save();
    console.log('Banco criado:', novoBanco);

    // Buscando o banco com a referência do usuário
    const bancoComUsuario = await Bancos.findOne({ nome_banco: 'Banco do Brasil' })
      .populate('usuario'); // Populando o campo 'usuario' com dados do usuário

    console.log('Banco com dados do usuário:', bancoComUsuario);
    
    // Fechar a conexão após o teste
    mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao testar chave estrangeira:', error);
  }
}

testarChaveEstrangeira();
