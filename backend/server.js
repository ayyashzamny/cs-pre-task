// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5050;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL user
  password: '',         // your MySQL password
  database: 'cs-pre-db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// API to handle form submission
app.post('/register', (req, res) => {
  const { firstName, lastName, email, company, comapnyurl, marketingConsent } = req.body;
  const sql = `INSERT INTO registrations (firstName, lastName, email, company, companyUrl, marketingConsent) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [firstName, lastName, email, company, comapnyurl, marketingConsent ? 1 : 0], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error.');
    }
    res.send({ success: true, message: 'Registration successful!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
