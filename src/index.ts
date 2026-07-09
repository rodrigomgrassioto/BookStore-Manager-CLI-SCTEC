import { TerminalController } from './controllers/TerminalController.js'
import {buscarLivroPorTitulo, criaLivro, listarLivros} from "./repositories/LivroRepository";

async function main() {
    const terminalController = new TerminalController();
    // Inicia o loop do menu
    await terminalController.iniciarMenu();
}

main();
// testes();
/**
 * Forma SIMPLES de testar os repositórios.
 *
 * OBS: Tem que comentar a linha 10 main() e des-comentar a linha 11 - testes()
 * e o item abaixo a result... ser testado e também o console.log respectivo.
 */
async function testes() {
    // const resultListar = await listarLivros()
    // const resultBuscar = await buscarLivroPorTitulo("o amor")
    // const resultCriar = await criaLivro("Teste Titulo 6", "12345e", 1953, 3 ,12)
    // console.log(resultListar);
    // console.log(resultBuscar);
    // console.log(resultCriar);

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