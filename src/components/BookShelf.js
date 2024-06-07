import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = ({ shelfTitle, books, onChangeShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
        ))}
      </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  })).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelf;