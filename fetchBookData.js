const axios = require('axios');

async function fetchBookData() {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
    return response.data.items;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return [];
  }
}

module.exports = fetchBookData;
