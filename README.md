# Encrypted Data Handling with JWT in React

This project demonstrates a simple client-server application where data is encrypted using AES encryption via **CryptoJS** on the client-side, and verified using **JWT tokens** on the server-side. The client communicates with the backend to send and receive encrypted data, and the integrity of the data is verified using JWT.

## Features

- **AES Encryption**: The client encrypts the data before sending it to the server.
- **JWT Token Verification**: The server generates a JWT token when data is updated, and the client can verify data integrity by checking the token.
- **Data Recovery**: The client fetches the encrypted data from the server and verifies its integrity.
- **React**: The front-end is built using React, with state management using `useState` and API calls using `fetch`.

## Technologies Used

- **Frontend**:
  - React (with TypeScript)
  - CryptoJS (for AES encryption)
  - Fetch API (for communication with backend)

- **Backend**:
  - Express.js
  - JSON Web Token (JWT)
  - CryptoJS (for encryption on the server)
  
## Prerequisites

- Node.js (v16 or above)
- npm or yarn package manager

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/your-repo/encrypted-data-handling.git
cd encrypted-data-handling

