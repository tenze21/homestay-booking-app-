import app from "./app.js";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pkg;
const pool = new Pool({
  user: process.env.POSTGRES_USER, 
  host: process.env.POSTGRES_HOST, 
  database: process.env.POSTGRES_DATABASE, 
  password: process.env.POSTGRES_PASSWORD, 
  connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?ssl=true`,
  port: 5432, 
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Database connection successful:", res.rows[0].now);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});

export default pool;