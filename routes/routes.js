const express = require('express');
const router = express.Router();
const { sequelize,Sequelize,Op, Book, ReturnBook } = require('../models/Book'); // Assuming your models are in the '../models/Book' path

router.post('/addBook', async (req, res) => {
  try {
    const { bookName, author, takeOn, deliverAt, fine } = req.body;
    const book = await Book.create({ bookName, author, takeOn, deliverAt, fine });
    res.status(200).json({ message: 'Book added successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding book' });
  }
});

router.get('/searchBooks', async (req, res) => {
  const searchTerm = req.query.term;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    // Search for books with matching names
    const searchResults = await Book.findAll({
      where: {
        bookName: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    });

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/returnBook', async (req, res) => {
    try {
      const { bookId } = req.body;
  
      // Find the book by ID
      const book = await Book.findByPk(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Calculate the time difference in hours
      const takeOnTime = new Date(book.takeOn);
      const returnTime = new Date();
      const timeDifferenceInMs = returnTime - takeOnTime;
      const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);
  
      // Calculate the fine
      let fine = 0;
      if (timeDifferenceInHours > 24) {
        fine = 0;
      } else {
        fine = timeDifferenceInHours * 10;
      }
  
      // Update the book's fine in the database
      await book.update({ fine });
  
      res.status(200).json({ message: 'Book returned successfully', fine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error returning book' });
    }
  });
  
module.exports = router;