import React, { useState } from 'react';
import Book from './Book';
import { search } from '../BooksAPI';
import { Link } from 'react-router-dom';


const SearchBooks = ({ changeShelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const books = await search(value);
      setResults(books);
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

export default SearchBooks;
