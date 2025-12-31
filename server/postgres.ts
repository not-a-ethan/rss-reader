import postgres from "postgres";

const config: any = useRuntimeConfig();

export const sql: any = postgres({
    host: config.pgHost,
    port: Number(config.pgPort),
    database: config.pgName,
    user: config.pgUser,
    password: config.pgPassword,
    ssl: {
        rejectUnauthorized: false
    }
});