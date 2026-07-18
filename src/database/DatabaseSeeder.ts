import * as fs from 'fs';
import * as path from 'path';
import { pool } from './connection';
import {alertaMsg, erroMsg, sucessoMsg} from "../utils/estilo"; // Conexão oficial do seu projeto

// 1. Defina aqui a lista dos arquivos de seed na ordem exata que devem rodar
// (Simulando o $this->call() do Laravel)
const seedsToRun = [
    '0001_seed_autores.sql',
    '0002_seed_livros.sql',
    '0003_seed_clientes.sql',
    '0004_seed_emprestimos_devolvidos.sql',
    '0005_seed_emprestimos_ativos.sql',
];

async function runSeeds() {
    // Pega uma conexão limpa do pool oficial
    const client = await pool.connect();

    sucessoMsg(`🌱 Iniciando o semeamento do banco de dados...`, false);

    try {
        const seedsDir = path.join(__dirname, 'seeds');

        for (const file of seedsToRun) {
            const filePath = path.join(seedsDir, file);

            // Verifica se o arquivo listado realmente existe na pasta
            if (!fs.existsSync(filePath)) {
                erroMsg(`Arquivo de seed não encontrado: ${file}. Pulando...`, false);
                continue;
            }

            alertaMsg(`⚙️ Executando seed: ${file}...`);
            const sqlQuery = fs.readFileSync(filePath, 'utf-8');

            // Executa em uma transação para garantir consistência
            await client.query('BEGIN');
            try {
                await client.query(sqlQuery);
                await client.query('COMMIT');
                sucessoMsg(`Seed aplicado com sucesso: ${file}`, false);
            } catch (err: any) {
                await client.query('ROLLBACK');
                erroMsg(`Falha ao rodar os dados do arquivo ${file}. Alterações deste arquivo desfeitas.`, false);

                // Tratamento de erros comuns em inserções de seeds
                switch (err.code) {
                    case '23505': erroMsg("   -> Erro: Registro duplicado detectado (Unique Violation).", false); break;
                    case '23503': erroMsg("   -> Erro: Chave estrangeira inválida (Foreign Key Violation).", false); break;
                    default: erroMsg(`   -> Erro Postgres [Código ${err.code}]: ${err.message}`, false);
                }
                throw err; // Interrompe o processo para avaliar o erro no script
            }
        }

        sucessoMsg('Banco de dados semeado com sucesso!', false);

    } catch (error) {
        erroMsg('Processo de seed abortado devido a erros nos dados.', false);
    } finally {
        // Libera a conexão de volta para o Pool
        client.release();
    }
}

async function main() {
    await runSeeds();
    // Fecha o pool para encerrar o processo no terminal graciosamente
    await pool.end();
}

main();
