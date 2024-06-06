import "./App.css";
import BookShelfList from "./components/BookShelfList";
import { Route, Routes } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import { getAll } from './BooksAPI';
import React, { useState, useEffect } from 'react';


  function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
          const res = await getAll();
          setBooks(res);
        };

        getBooks();
      }, []);

    const changeShelf = (book, newShelf) => {
        setBooks(prevBooks => {
          const updatedBooks = prevBooks.map(b =>
            b.id === book.id ? { ...b, shelf: newShelf } : b
          );
          if (!updatedBooks.find(b => b.id === book.id)) {
            book.shelf = newShelf;
            updatedBooks.push(book);
          }
          return updatedBooks;
        });
      };

    return (
        <div className="app">
        <Routes>
            <Route path="/" element={<BookShelfList books={books} changeShelf={changeShelf} />}  />
            <Route path="/search" element={<SearchBooks books={books} changeShelf={changeShelf} />} />
        </Routes>
        </div>
      );
  }

export default App;
