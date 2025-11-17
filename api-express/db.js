const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "12345", // tu password real
    database: "musica_db" // la misma DB que usa NestJS
});

module.exports = pool;
