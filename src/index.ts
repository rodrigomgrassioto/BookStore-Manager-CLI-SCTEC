import { pool} from './database/connection';

console.log('Happy developing ✨')

testarConexao();



async function testarConexao() {
    // // const result = await listarLivros()
    // // const result = await buscarLivroPorTitulo("o amor")
    // const result = await criaLivro("Teste Titulo 6", "12345e", 1953, 3 ,12)
    // console.log(result);


    try {
        const resultado = await pool.query('SELECT NOW();');
        console.log('🎉 Conexão com o banco realizada com sucesso!');
        console.log('📅 Data e Hora do Banco:', resultado.rows[0].now);

    } catch (erro) {
        console.error('❌ Erro ao conectar no banco de dados:', erro);
    } finally {
        // Fecha o pool para o Node não ficar "preso" rodando no terminal
        await pool.end();
    }
}