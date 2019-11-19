import React, { Component } from 'react';
import SearchBooks from './searchBooks/searchBooks';
import BookList from './bookList/bookList';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: {},
      error: '',
      showBookList: false
    }
  }

  setBookList(books) {
    this.setState({
      books
    })
  }

  setError(error) {
    this.setState({
      error: error
    })
  }

  render() {
    return (
      <main className="App">
        <h2 className='mainHeading'>Google Book Search</h2>
        <SearchBooks 
          error={this.state.error}
          handleBookList={books => this.setBookList(books)}
          handleError={error => this.setError(error)}
        />
        <BookList
          books={this.state.books}
          error={this.state.error}
        />
      </main>
    );
  }
}

export default App;
