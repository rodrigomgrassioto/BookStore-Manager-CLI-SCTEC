import {Pool} from "pg";

export const pool: Pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    max: 10, // máximo de conexões
    idleTimeoutMillis: Number(process.env.PG_TIME_OUT_MS) ||30000,
});

pool.on('error', (err) => {
    console.error('\n❌ Erro crítico e inesperado no banco de dados:\n', err.message);
    process.exit(1);
});