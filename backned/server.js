const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });



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

// API endpoint for registration
app.post('/register', upload.fields([{ name: 'idProofImage', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), (req, res) => {
  const {
    name, dob, phoneNumber, altPhoneNumber, email,
    country, state, city, address, identityCard,
    idNumber, charges
  } = req.body;

  const idProofImage = req.files['idProofImage'] ? `/uploads/${req.files['idProofImage'][0].filename}` : null;
  const photo = req.files['photo'] ? `/uploads/${req.files['photo'][0].filename}` : null;

  const query = `
    INSERT INTO registration (
      name, dob, phoneNumber, altPhoneNumber, email,
      country, state, city, address, identityCard,
      idNumber, idProofImage, charges, photo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name, dob, phoneNumber, altPhoneNumber, email,
    country, state, city, address, identityCard,
    idNumber, idProofImage, charges, photo
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to register' });
    }
    res.status(200).json({ message: 'Registration successful', id: results.insertId });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
