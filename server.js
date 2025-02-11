const express = require('express');
const path = require('path');

// Serve static files from public/
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Set up public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});