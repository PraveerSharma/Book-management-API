# Book-management-API

Book Management API is a full-stack web application that allows users to manage a collection of books. Users can perform CRUD (Create, Read, Update, Delete) operations on books, filter books by genre, sort books by various criteria, and interact with an external API to initially seed the database.

Features:
  Create a new book with title, author, genre, and other details.
  Retrieve all books or get a specific book by ID.
  Filter books by genre.
  Sort books by published year or other criteria.
  Update book details based on ISBN.
  Delete a book by ISBN.
  Seed the database with initial book data from the Google Books API.

Technologies Used:
Programming Languages: JavaScript (Node.js)
Web Framework: Express.js
Database: MongoDB (with Mongoose for modeling)
API Integration: Consumed Google Books API to seed the initial data.
Asynchronous Programming: Utilized asynchronous programming for handling API requests and database operations.
Data Modeling and Schema Design: Defined a book schema to structure and manage data efficiently.
Error Handling: Implemented error handling for API responses.
Software Development Life Cycle: Followed Agile methodologies for project development and task management.

Setup and Usage - 
Prerequisites:
1. Node.js and npm (Node Package Manager) should be installed on your system.
2. MongoDB should be installed and running.
3. Clone the Repository:
    git clone <repository_url>
    cd book-management-api

  Install Dependencies:
    npm install
  
  Seed the Database:
    node server.js
  
  Test API Endpoints:
    Use tools like Postman to test the API endpoints as described in the project overview.

  How to Run: 
    To run the application, follow these steps after completing the setup:

  Start the server:
    node server.js
    Access the API using the base URL http://localhost:3000.

