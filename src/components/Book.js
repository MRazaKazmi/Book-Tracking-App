import React from "react";
import PropTypes from 'prop-types';


const Book = ({ book, onChangeShelf }) => {

    const handleShelfChange = (event) => {
        onChangeShelf(book, event.target.value);
      };

    const thumbnail = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : '';

    const shelfOptions = [
        { shelfName: 'currentlyReading', shelfDisplayName: 'Currently Reading' },
        { shelfName: 'wantToRead', shelfDisplayName: 'Want to Read' },
        { shelfName: 'read', shelfDisplayName: 'Read' },
        { shelfName: 'none', shelfDisplayName: 'None' }
      ];

    return(
    <li>
    <div className="book">
        <div className="book-top">
            <div
            className="book-cover"
            style={{
                width: 128,
                height: 193,
                backgroundImage:
                `url(${thumbnail})`,
            }}
            ></div>
            <div className="book-shelf-changer">
            <select value={book.shelf} onChange={handleShelfChange}>
                <option value="none" disabled>
                Move to...
                </option>
                {shelfOptions.map(option => (
                <option key={option.shelfName} value={option.shelfName}>{option.shelfDisplayName}</option>
            ))}
            </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
    </div>
    </li>
    )};

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
        }),
        shelf: PropTypes.string,
    }).isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    };

export default Book;
