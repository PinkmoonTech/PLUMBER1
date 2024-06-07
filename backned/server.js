const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'servicei'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.json());

// Login route
app.post('/login', (req, res) => {
  const { phoneNumber, pin } = req.body;
  
  // Query to find user by phone number
  const query = `SELECT * FROM login WHERE phoneNumber = ?`;
  connection.query(query, [phoneNumber], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    const user = results[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.pin !== pin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const {phoneNumber,pin,confirmPin,userType } = req.body;

  const query = `INSERT INTO login (phoneNumber,pin,confirmPin,userType) VALUES (?, ?, ?, ?)`;
  connection.query(query, [phoneNumber,pin,confirmPin,userType], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    if (results.affectedRows === 1) {
      if (userType === 'service') {
        return res.status(201).json({ message: 'Service person registered successfully' });
      } else if (userType === 'customer') {
        return res.status(201).json({ message: 'Customer registered successfully' });
      } else {
        return res.status(400).json({ message: 'Invalid user type' });
      }
    } else {
      return res.status(500).json({ message: 'Failed to register user' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
