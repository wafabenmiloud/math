const pg = require("pg");

exports.dbConnect = async function () {
    const poolConfig = {
        user: "main",
        password: "main",
        host: "postgresdatabase.internal",
        port: 5432,
        database: "main",    
    };

    const pool = new pg.Pool(poolConfig);
    
    const client = await pool.connect();
        console.log("Connected to PostgreSQL database");
        return client;
    
};
 