const { Client } = require ('pg');
const express = require ('express');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const client = new Client({
    database: 'social-media'
});

client.connect();

//route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
    console.log()
});

app.post('/users', (req, res) => {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['kenzie', 'Kenzie Adademy'];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
})
});

app.listen(port, () => {
    client.connect();
});