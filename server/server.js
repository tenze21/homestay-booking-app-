const app=require('./app');
require('dotenv').config();
const {Pool}= require('pg');

const pool= new Pool({
    connectionString: process.env.PG_URL,
    password: process.env.PG_PASSWORD,
    ssl:{
        rejectUnauthorized: false,
    },
    port: process.env.PORT,
})

pool.query('SELECT NOW()', (err,res)=>{
    if(err){
        console.error('Error connecting to database:', err);
    }else{
        console.log('Database connection successful:', res.rows[0].now);
    }
});

const port=process.env.PORT;
app.listen(port, ()=>{
    console.log(`server running on port ${port}...`);
})

