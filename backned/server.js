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
app.use(bodyParser.json());
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
const upload = multer({ storage: storage });

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





app.post(
  "/register",
  upload.fields([
    { name: "idProofImage", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("Received request body:", req.body)
    const {
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

    const idProofImage = req.files["idProofImage"]
      ? `/uploads/${req.files["idProofImage"][0].filename}`
      : null;
    const photo = req.files["photo"]
      ? `/uploads/${req.files["photo"][0].filename}`
      : null;

    const query = `
    INSERT INTO registerasservice(
      name, dob, phoneNumber,pin,confirmPin, altPhoneNumber, email,
      country, state, city, address, identityCard,
      idNumber, idProofImage, charges, photo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
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
        console.error(err);
        return res.status(500).json({ error: "Failed to registerasservice" });
      }
      res
        .status(200)
        .json({ message: "Registration successful", id: results.insertId });
        console.log(err);
    });
  }
);



// API endpoint to handle registration POST request
app.post("/registerascustomers",  (req, res) => {
  console.log("Received request body:", req.body);
  const {
    name,
    phoneNumber,
    pin,
    confirmPin,
    altPhoneNumber,
    address,
    idNumber,
  } = req.body;
  console.log(req.body);


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
// app.get("/registrations", (req, res) => {

//   const query = `SELECT * FROM registration`;
  
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.log("error", err);
//       console.error("Error executing MySQL query:", err);
//       return res.status(500).json({ error: "Failed to fetch registrations" });
//     }
//     console.log(results);
//     res.status(200).json(results);
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
