const express = reqire('express')
const mysql = require('mysql')
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

db.connect((err) => {  
    if (err) throw err;
    console.log('koblet til databasa');
});
app.post('/run-query', (req, res) =>{
    const { query } = req.body; //brukerspøring
    db.query(query, (err,results) => {
        if (err) {
            res.status(400).json({ error: err.message});
        } else {
            res.json({ results });
        }
    });
});
app.listen(3007, () => console.log('Server running on port 3007'));