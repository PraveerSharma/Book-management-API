const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const fetchBookData = require('./fetchBookData');
const Book = require('./models/Book');

app.use(express.json());

const mongoURI = 'mongodb+srv://praveers125:lG1P7M3U6yB3xoBC@cluster0.uf6ajb3.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => {
  console.log('Connected to MongoDB');
  seedDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Error seeding database:', error);
  });
});

async function seedDatabase() {
  const books = await fetchBookData();
  
  for (const book of books) {
    const bookInfo = book.volumeInfo;
    const newBook = new Book({
      title: bookInfo.title,
      author: bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author',
      genre: bookInfo.categories ? bookInfo.categories.join(', ') : 'Unknown Genre',
      publishedYear: bookInfo.publishedDate ? new Date(bookInfo.publishedDate).getFullYear() : null,
      isbn: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : 'Unknown ISBN'
    });

    await newBook.save();
  }
}

// endpoints

// Create a new book
app.post('/books', async (req, res) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    });
  
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all books
  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single book by ID
  app.get('/books/:id', getBook, (req, res) => {
    res.json(res.book);
  });
  
  // Update a book by ID
  app.patch('/books/:id', getBook, async (req, res) => {
    if (req.body.title) {
      res.book.title = req.body.title;
    }
    if (req.body.author) {
      res.book.author = req.body.author;
    }
    if (req.body.genre) {
      res.book.genre = req.body.genre;
    }
  
    try {
      const updatedBook = await res.book.save();
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a book by ID
  app.delete('/books/:id', getBook, async (req, res) => {
    try {
      await res.book.remove();
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Filter books by genre
app.get('/books/genre/:genre', async (req, res) => {
    try {
      const books = await Book.find({ genre: req.params.genre });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Sort books by a specific field
  app.get('/books/sort/:sortBy', async (req, res) => {
    try {
      const books = await Book.find().sort(req.params.sortBy);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get books published in a specific year
  app.get('/books/year/:year', async (req, res) => {
    try {
      const books = await Book.find({ publishedYear: req.params.year });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update book by ISBN
  app.patch('/books/isbn/:isbn', async (req, res) => {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        { isbn: req.params.isbn },
        { $set: req.body },
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete book by ISBN
  app.delete('/books/isbn/:isbn', async (req, res) => {
    try {
      const deletedBook = await Book.findOneAndRemove({ isbn: req.params.isbn });
      res.json({ message: 'Book deleted', deletedBook });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  async function getBook(req, res, next) {
    let book;
    try {
      book = await Book.findById(req.params.id);
      if (book == null) {
        return res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.book = book;
    next();
  }
  
  // ... Rest of the code ...
  
  
