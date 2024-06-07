import React, { useState, useEffect } from 'react';
import Book from './Book';
import { search, getAll } from '../BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const SearchBooks = ({ changeShelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [shelfBooks, setShelfBooks] = useState([]);

  useEffect(() => {
    const loadShelfBooks = async () => {
      const sbooks = await getAll();
      setShelfBooks(sbooks);
    };
    loadShelfBooks();
  }, []);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const books = await search(value);
      if (books) {
        const updatedResults = books.map(book => {
          const matchingBook = shelfBooks.find(shelfBook => shelfBook.id === book.id);
          if (matchingBook) {
            book.shelf = matchingBook.shelf;
          }
          return book;
        });
        setResults(updatedResults);
      } else {
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
      <Link to="/" className="close-search">Search</Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={handleSearch}
        />
      </div>
      </div>
      <div className="search-books-results">
      <ol className="books-grid">
        {results.length > 0 ? (
          results.map((book) => (
            <Book key={book.id} book={book} onChangeShelf={changeShelf} />
          ))
        ) : (
          <p>No results found</p>
        )}
        </ol>
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  changeShelf: PropTypes.func.isRequired,
};

export default SearchBooks;
