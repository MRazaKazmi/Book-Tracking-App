import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const BookShelfList = ({ books, changeShelf }) => {

  const shelves = [
    { title: 'Currently Reading', id: 'currentlyReading' },
    { title: 'Want to Read', id: 'wantToRead' },
    { title: 'Read', id: 'read' }
  ];

  console.log('books:', books);

  return (
    <div className="list-books">
        <div className="list-books-title">
        <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        <div></div>
      {shelves.map(shelf => (
        <BookShelf
          key={shelf.id}
          shelfTitle={shelf.title}
          books={books.filter(book => book.shelf === shelf.id)}
          onChangeShelf={changeShelf}
        />
      ))}
      <div className="open-search">
        <Link to="/search" className="close-search">Add a book</Link>
      </div>
    </div>
    </div>
  );
};

BookShelfList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  })).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelfList;