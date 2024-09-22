import express from "express";
import cors from "cors";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

interface DB {
  data: string;
  token?: string;
}

const PORT = 8080;
const app = express();
const database: DB = { data: "Hello World", token: undefined };

const encryptionKey = "puppies_are_amazing";
const jwtKey = "bone_is_in_the_ground";

app.use(cors());
app.use(express.raw({ type: 'application/json' }));

// Route to get current data
app.get("/", (req, res) => {
  res.json(database);
});

// Route to update data, decrypt it, and return a signed JWT token
app.post("/", (req, res) => {
  try {
    const bytes = CryptoJS.AES.decrypt(req.body.toString(), encryptionKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Signing the data using JWT
    const token = jwt.sign(decryptedData, jwtKey, { expiresIn: '1h' });

    database.data = decryptedData.data;
    database.token = token;

    res.status(200).json({ data: database.data, token });
  } catch (error) {
    console.error("Decryption or JWT error:", error);
    res.status(400).send("Invalid data");
  }
});

// Route to verify the JWT token
app.post("/verify", (req, res) => {
  const { token } = JSON.parse(req.body);
  try {
    const decoded = jwt.verify(token, jwtKey);
    res.json({ verified: true, data: decoded });
  } catch (error) {
    res.json({ verified: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
