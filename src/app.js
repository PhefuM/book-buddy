const API_URL = `https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyDbde2mN1C-qESuiYnIPF3H0jSsl4ZA6Oo`


async function fetchBooks(query) {
  try {
    const url = `${API_URL}${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    displayResults(response.data.items);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

function displayResults(books) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';

    const bookInfo = book.volumeInfo;

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = bookInfo.title;

    const bookAuthors = document.createElement('p');
    bookAuthors.textContent = bookInfo.authors ? `by ${bookInfo.authors.join(', ')}` : 'Unknown Author';

    const bookDescription = document.createElement('p');
    bookDescription.textContent = bookInfo.description || 'No description available.';

    const bookRating = document.createElement('p');
    bookRating.textContent = bookInfo.averageRating ? `Average Rating: ${bookInfo.averageRating}` : 'No rating available.';

    const viewButton = document.createElement('button');
    viewButton.textContent = 'View Book';
    viewButton.onclick = () => {
      const isbn = bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null;
      if (isbn) {
        initializeViewer(isbn);
      } else {
        alert('ISBN not available for this book');
      }
    };

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthors);
    bookCard.appendChild(bookDescription);
    bookCard.appendChild(bookRating);
    bookCard.appendChild(viewButton);

    resultsContainer.appendChild(bookCard);
  });
}
