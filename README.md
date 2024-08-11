# Code Conquer

**Code Conquer** is an online coding platform developed using the MERN stack. It provides users with a comprehensive coding environment to practice, compete, and improve their coding skills. The platform features a **Coding Playground**, **Coding Arena**, and **Coding Battleground**, making it ideal for learners and professionals alike.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Coding Playground**: A place to write, run, and test your code.
- **Coding Arena**: Engage in coding challenges and competitions.
- **Coding Battleground**: A battle zone for head-to-head coding duels.
- **Dark Mode**: An eye-friendly interface for coding in low light.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Vercel

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/code-conquer.git
   cd code-conquer
   ```

2. **Install dependencies**:
   - Install client dependencies:
     ```bash
     cd client
     npm install
     ```
   - Install server dependencies:
     ```bash
     cd ../server
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory and add your environment variables. Example:
     ```env
     MONGODB_URI=your-mongodb-uri
     PORT=5000
     ```

4. **Run the application**:
   - Start the server:
     ```bash
     cd server
     npm start
     ```
   - Start the client:
     ```bash
     cd ../client
     npm start
     ```

   The application should now be running locally on `http://localhost:3000`.

## Usage

- **Landing Page**: Choose between the Playground, Arena, or Battleground.
- **Coding Playground**: Write and test your code.
- **Coding Arena**: Participate in coding challenges.
- **Coding Battleground**: Compete with others in real-time coding battles.

## Project Structure

```bash
code-conquer/
│
├── client/           # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       └── index.js
│
├── server/           # Backend (Node.js, Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── README.md
└── package.json
```

## Deployment

The application is hosted on Vercel. You can visit the live site [here](https://code-conquer.vercel.app/).

To deploy your own version:

1. **Fork the repository**.
2. **Push your changes**.
3. **Connect the repository to Vercel**.
4. **Deploy**.

## Contributing

Contributions are welcome! If you’d like to contribute, please fork the repository and make your changes. Submit a pull request with a detailed explanation of your changes.
