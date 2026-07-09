import { TerminalController } from './controllers/TerminalController.js'

async function main() {
    const terminalController = new TerminalController();
    // Inicia o loop do menu
    await terminalController.iniciarMenu();
}

main();


// testarConexao();

// async function testarConexao() {
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
// }