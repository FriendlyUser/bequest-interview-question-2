import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [signature, setSignature] = useState<string>();

  useEffect(() => {
    getData();
  }, []);

  // Fetch data from the server
  const getData = async () => {
    const response = await fetch(API_URL);
    const { data, token } = await response.json();
    console.log('Data received:', data);
    setData(data);
    setSignature(token);
  };

  // Update data to the server with AES encryption and JWT token creation
  const updateData = async () => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify({ data }), import.meta.env.VITE_SECRET_KEY).toString();
    await fetch(API_URL, {
      method: "POST",
      body: encrypted,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData(); // Fetch new data and token after update
  };

  // Verify the integrity of data using JWT token
  const verifyData = async () => {
    const response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      body: JSON.stringify({ token: signature }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.verified) {
      alert('Data is valid and untampered!');
    } else {
      alert('Data has been tampered with or the token is invalid.');
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Encryption & Verification</h1>
      <div>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ fontSize: "16px", width: "400px" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={updateData} style={{ fontSize: "16px", marginRight: "10px" }}>
          Update Data
        </button>
        <button onClick={verifyData} style={{ fontSize: "16px" }}>
          Verify Data
        </button>
      </div>
    </div>
  );
}

export default App;
