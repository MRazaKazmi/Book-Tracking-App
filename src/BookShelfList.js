import React, { useState, useEffect } from 'react';
import BookShelf from './BookShelf';
import { getAll } from './BooksAPI';

const BookShelfList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await getAll();
      setBooks(res);
    };

    getBooks();
  }, []);


  const changeShelf = (book, newShelf) => {
    setBooks(books.map(b => (b.id === book.id ? { ...b, shelf: newShelf } : b)));
  };

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
    </div>
    </div>
  );
};

export default BookShelfList;