const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
// const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(axios)

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "servicei",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});


// Registration endpoint for customers
app.post("/registerascustomers", (req, res) => {
  const { name, phoneNumber, pin, confirmPin, altPhoneNumber, address, idNumber } = req.body;
  const query = `
    INSERT INTO registerascustomer (name, phoneNumber, pin, confirmPin, altPhoneNumber, address, idNumber, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `;
  const values = [name, phoneNumber, pin, confirmPin, altPhoneNumber, address, idNumber];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to register customer" });
    }
    res.status(200).json({ message: "Registration successful", id: results.insertId });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { phoneNumber, pin } = req.body;
  const customerQuery = `SELECT * FROM registerascustomer WHERE phoneNumber = ? AND pin = ?`;
  const serviceQuery = `SELECT * FROM registerasservice WHERE phoneNumber = ? AND pin = ?`;

  connection.query(customerQuery, [phoneNumber, pin], (err, customerResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Login failed" });
    }
    if (customerResults.length > 0) {
      return res.status(200).json({ role: "customer", message: "Login successful" });
    }

    connection.query(serviceQuery, [phoneNumber, pin], (err, serviceResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Login failed" });
      }
      if (serviceResults.length > 0) {
        return res.status(200).json({ role: "service", message: "Login successful" });
      }

      res.status(401).json({ error: "Invalid phone number or pin" });
    });
  });
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Example limit (1MB)
  fileFilter: (req,files,cb) => {
    // Example file filter if needed
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  }
});




app.post(
  "/register",
  (req, res) => {
    // console.log("Received request body:", req.body)
    // console.log("Received files:", req.files);

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const {
      registrationType,
      name,
      dob,
      phoneNumber,
      pin,
      confirmPin,
      altPhoneNumber,
      email,
      country,
      state,
      city,
      address,
      identityCard,
      idNumber,
      charges,
      
    } = req.body;
    




    // Log the received fields and file information
  // console.log({
  //   name, dob, phoneNumber, pin, confirmPin, altPhoneNumber, email,
  //   country, state, city, address, identityCard, idNumber, charges,
  //   idProofImage: req.file.path
  // });

  // res.send('File uploaded and data received.');

    // const idProofImage = req.body["idProofImage"]
    //   ? `/uploads/${req.files["idProofImage"][0].filename}`
    //   : null;
    // const photo = req.body["photo"]
    //   ? `/uploads/${req.files["photo"][0].filename}`
    //   : null;

    const query = `
    INSERT INTO registerasservice(
      registrationType,name, dob, phoneNumber,pin,confirmPin, altPhoneNumber, email,
      country, state, city, address, identityCard,
      idNumber, idProofImage, charges, photo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
      registrationType,
      name,
      dob,
      phoneNumber,
      pin,
      confirmPin,
      altPhoneNumber,
      email,
      country,
      state,
      city,
      address,
      idProofImage,
      idNumber,
      identityCard,
      charges,
      photo,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to registerasservice" });
      }
      console.log("Registration successful. Insert ID:", results.insertId);
      res
        .status(200)
        .json({ message: "Registration successful", id: results.insertId });
        console.log(err);
    });
  }
);



// API endpoint to handle registration POST request
app.post("/registerascustomers",  (req, res) => {
  
  const {
    name,
    phoneNumber,
    pin,
    confirmPin,
    altPhoneNumber,
    address,
    idNumber,
  } = req.body;
  


  const query = `
    INSERT INTO registerascustomer (
      name, phoneNumber, pin, confirmPin, altPhoneNumber, address, idNumber, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `;

  const values = [
    name,
    phoneNumber,
    pin,
    confirmPin,
    altPhoneNumber,
    address,
    idNumber,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to registercustomer" });
    }
    res
      .status(200)
      .json({ message: "Registration successful", id: results.insertId });
  });
});



// API endpoint to fetch all registrations
app.get("/registerascustomers", (req, res) => {

  const query = `SELECT * FROM registerascustomer`;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.log("error", err);
      console.error("Error executing MySQL query:", err);
      return res.status(500).json({ error: "Failed to fetch registrations" });
    }
    console.log(results);
    res.status(200).json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
