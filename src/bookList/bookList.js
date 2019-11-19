import React, { Component } from 'react';
import './bookList.css';
import Book from '../book/book';

export default class BookList extends Component {
  render() {
    const error = this.props.error
    ? <div className = 'googleAPI_error'>{this.props.error}</div>
    : '';

    let display = '';
    if (typeof this.props.books != 'undefined') {
      display = ( typeof this.props.books ) && this.props.books.length > 0
        ? this.props.books.map( (book, i) => <Book book={book} key={i} /> )
        : '';
    } else {
      display = 'Search results not found';
    }

    return (
      <div>
        {error}
        {display}
      </div>
    );
    }
}

BookList.defaultProps = {
  bookList: []
};