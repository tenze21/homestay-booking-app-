const app = require("./app");
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", 
  host: "localhost", 
  database: "homestay-booking-db", 
  password: "postgres", 
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
