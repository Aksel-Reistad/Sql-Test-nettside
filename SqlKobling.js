const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');  // 🔹 Importer CORS

const app = express();
app.use(cors());  // 🔹 Aktiver CORS
app.use(express.static(__dirname));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb',
    port: 3307
});

db.connect((err) => {  
    if (err) throw err;
    console.log('Koblet til databasen');
});

app.post('/run-query', (req, res) => {
    const query = req.body.query;
    db.query(query, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ results });
        }
    });
});

app.listen(8080, () => console.log('Server running on port 8080'));
