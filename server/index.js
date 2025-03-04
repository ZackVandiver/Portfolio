const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());

// A basic route
app.get('/', (req, res) => {
  res.send('Hello, Zack! Your Express server is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
