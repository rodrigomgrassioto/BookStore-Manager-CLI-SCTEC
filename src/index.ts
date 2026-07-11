import { TerminalController } from './controllers/TerminalController.js'
import {
    atualizarLivroRP, buscarLivroPorIdRP,
    buscarLivroPorTituloRP,
    criaLivroRP,
    deletarLivroRP,
    listarLivrosRP
} from "./repositories/LivroRepository";
import {atualizarLivroServ, criarLivroServ, deletarLivroServ, listarLivrosServ} from './services/LivroService'
import {
    buscarEmprestimoPorIdRP,
    livroJaFoiEmprestadoRP
} from "./repositories/EmprestimoRepository";
import {livroControllerCriar} from "./controllers/LivroController";

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
    // console.log(resultListar);

    // const resultBuscarId = await buscarLivroPorIdRP(5)
    // console.log(resultBuscarId);

    // const resultBuscar = await buscarLivroPorTitulo("o amor")
    // console.log(resultBuscar);

    // const resultCriar = await criaLivro("Teste Titulo 6", "12345f", 1953, 3 ,12)
    // console.log(resultCriar);

    // const resultAtualizar = await atualizarLivro(3,"Teste Atualização 2", "12345e", 1953, 3 ,12)
    // console.log(resultAtualizar);

    // const resultDeletar = await deletarLivro(32);
    // console.log(resultDeletar);

    // const listarLivrosComService = await listarLivrosServ()
    // console.log(listarLivrosComService);

    // const criarLivroComService = await criarLivroServ('Livro com validador de isbn','978535912432', 5, 2, -350)
    // console.log(criarLivroComService);

    // const atualizarLivroComService = await atualizarLivroServ(1,'Dom Casmurro','9788594318602', 1899, 5, 1)
    // console.log(atualizarLivroComService);

    // const buscarEmprestimoPorIdRp = await buscarEmprestimoPorIdRP(33)
    // console.dir(buscarEmprestimoPorIdRp, { depth: 3 });

    // const livroJaFoiEmprestadoNoRP = await livroJaFoiEmprestadoRP(136);
    // console.log(livroJaFoiEmprestadoNoRP)

    // const deletarLivroSr  = await deletarLivroServ(13);
    // console.log(deletarLivroSr);

    // console.log(consultarSeLivroJaFoiEmprestadoRP);

    livroControllerCriar();



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