import { TerminalController } from './controllers/TerminalController.js'
import {
    atualizarLivroRP,
    buscarLivroPorTituloRP,
    criaLivroRP,
    deletarLivroRP,
    listarLivrosRP
} from "./repositories/LivroRepository";
import {atualizarLivroServ, criarLivroServ, listarLivrosServ} from './services/LivroService'

async function main() {
    const terminalController = new TerminalController();
    // Inicia o loop do menu
    await terminalController.iniciarMenu();
}

// main();
testes();
/**
 * Forma SIMPLES de testar os repositórios.
 *
 * OBS: Tem que comentar a linha 10 main() e des-comentar a linha 11 - testes()
 * e o item abaixo a result... ser testado e também o console.log respectivo.
 */
async function testes() {
    // const resultListar = await listarLivros()
    // const resultBuscar = await buscarLivroPorTitulo("o amor")
    // const resultCriar = await criaLivro("Teste Titulo 6", "12345f", 1953, 3 ,12)
    // const resultAtualizar = await atualizarLivro(3,"Teste Atualização 2", "12345e", 1953, 3 ,12)
    // const resultDeletar = await deletarLivro(32);
    // const listarLivrosComService = await listarLivrosServ()
    // const criarLivroComService = await criarLivroServ('Livro com validador de isbn','978535912432', 5, 2, -350)
    const atualizarLivroComService = await atualizarLivroServ(1,'Dom Casmurro','9788594318602', 1899, 5, 1)
    // console.log(resultListar);
    // console.log(resultBuscar);
    // console.log(resultCriar);
    // console.log(resultAtualizar);
    // console.log(resultDeletar);
    // console.log(listarLivrosComService);
    // console.log(criarLivroComService);
    console.log(atualizarLivroComService);

//     try {
//         const resultado = await pool.query('SELECT NOW();');
//         console.log('🎉 Conexão com o banco realizada com sucesso!');
//         console.log('📅 Data e Hora do Banco:', resultado.rows[0].now);
//
//     } catch (erro) {
//         console.error('❌ Erro ao conectar no banco de dados:', erro);
//     } finally {
//         // Fecha o pool para o Node não ficar "preso" rodando no terminal
//         await pool.end();
//     }
}