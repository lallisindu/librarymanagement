const { Sequelize, DataTypes, Op, Book, ReturnBook,sequelize } = require('./models/Book');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes=require('./routes/routes')

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/',routes);


// Sync the models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
