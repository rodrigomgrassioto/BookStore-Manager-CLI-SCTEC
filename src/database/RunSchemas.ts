import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { pool } from './connection'; // Herda a conexão que já usa o process.env padrão

// Configuração temporária usando o process.env padrão do projeto, apenas para criar o banco se ele não existir
const bootstrapConfig = {
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
    connectionTimeoutMillis: Number(process.env.PG_TIME_OUT_MS) || 5000,
    database: 'postgres', // Conecta obrigatoriamente no banco padrão do sistema para poder criar o seu
};

async function ensureDatabaseExists() {
    const client = new Client(bootstrapConfig);
    await client.connect();

    try {
        const dbName = process.env.PG_DATABASE;
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (res.rowCount === 0) {
            console.log(`🌐 Banco de dados "${dbName}" não existe. Criando...`);
            // SQL de criação de banco não aceita parâmetros ($1), concatenar com aspas duplas por segurança
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`✅ Banco de dados "${dbName}" criado com sucesso!`);
        } else {
            console.log(`ℹ️ Banco de dados "${dbName}" já existe.`);
        }
    } catch (error) {
        console.error('❌ Erro crítico ao verificar/criar o banco de dados:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

async function runSchemas() {
    // Pega uma conexão limpa do pool oficial do projeto
    const client = await pool.connect();

    try {
        // 1. Cria a tabela de controle de migrações se ela não existir
        await client.query(`
            CREATE TABLE IF NOT EXISTS migrations_history (
                id SERIAL PRIMARY KEY,
                migration_name VARCHAR(255) UNIQUE NOT NULL,
                executed_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // 2. Lê a pasta de schemas configurada no manual do projeto
        const schemasDir = path.join(__dirname, 'schemas');
        const files = fs.readdirSync(schemasDir);

        // Filtra os arquivos .sql e ordena em ordem alfabética (001, 002, 003...)
        const sqlFiles = files
            .filter(file => file.endsWith('.sql'))
            .sort((a, b) => a.localeCompare(b));

        console.log(`🚀 Iniciando a verificação de ${sqlFiles.length} arquivos de schema...`);

        // 3. Executa cada arquivo dentro de uma transação isolada
        for (const file of sqlFiles) {
            const alreadyRun = await client.query(
                `SELECT 1 FROM migrations_history WHERE migration_name = $1`,
                [file]
            );

            if ((alreadyRun.rowCount ?? 0) > 0) {
                console.log(`⏩ Schema pulado: ${file} (Já aplicado anteriormente)`);
                continue;
            }

            console.log(`⚙️ Aplicando schema: ${file}...`);
            const filePath = path.join(schemasDir, file);
            const sqlQuery = fs.readFileSync(filePath, 'utf-8');

            // Inicia uma transação usando a conexão do Pool
            await client.query('BEGIN');
            try {
                await client.query(sqlQuery);
                await client.query(
                    `INSERT INTO migrations_history (migration_name) VALUES ($1)`,
                    [file]
                );
                await client.query('COMMIT');
                console.log(`✅ Schema aplicado com sucesso: ${file}`);
            } catch (err: any) {
                await client.query('ROLLBACK');
                console.error(`\n❌ Falha catastrófica no arquivo ${file}. Alterações revertidas.`);

                switch (err.code) {
                    case '42P07': console.error("   -> Erro: Essa tabela ou relação já existe no banco."); break;
                    case '42704': console.error("   -> Erro: Tipo de dado ou objeto referenciado não existe."); break;
                    case '42601': console.error("   -> Erro: Erro de sintaxe no código SQL do arquivo."); break;
                    default: console.error(`   -> Erro Postgres [Código ${err.code}]: ${err.message}`);
                }
                throw err;
            }
        }

        console.log('\n🎉 Todos os schemas foram sincronizados perfeitamente!');

    } catch (error) {
        console.error('💥 Processo de migração abortado devido a erros no SQL.');
    } finally {
        // Libera a conexão de volta para o Pool
        client.release();
    }
}

async function main() {
    await ensureDatabaseExists();
    await runSchemas();

    // Fecha o Pool principal para o script TypeScript encerrar o terminal graciosamente
    await pool.end();
}

main();
