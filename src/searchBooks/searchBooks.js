import React, { Component } from 'react';
import './searchBooks.css';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

export default class SearchBooks extends Component {
  handleSubmit(e) {
    e.preventDefault();

    const searchItem = e.target.searchInput.value;
    const apiKey = 'AIzaSyCFqhT6E6gH_0njaXYi4cxnoZuuNCfjwnU';
    const apiURL = 'https://www.googleapis.com/books/v1/volumes';
    
    const params = {
      q: searchItem
    }

    if (e.target.book_type.value !== 'all') {
      params.filter = e.target.book_type.value;
    }

    if (e.target.print_type.value !== 'none') {
      params.printType = e.target.print_type.value;
    }

    const queryString = formatQueryParams(params);
    const url = apiURL + '?' + queryString;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return response.json();
      })
      .then(data => {
        const books = data.items;
        this.props.handleBookList(books);
      })
      .catch(err => {
        this.props.handleError(err.message)
      });
  }

  render() {
    return (
      <div className='SearchBooks'>
        <form className='SearchBooks__form' onSubmit={e => this.handleSubmit(e)}>
          <div className='SearchBooks__searchBar'>
            <label htmlFor='SearchInput' className='bold'>Search: </label>
            <input
              type='text'
              name='searchInput'
              id='searchInput'
              placeholder='Search'
              required
            />
            <button type='submit'>Search</button>
          </div>
          <div className='SearchBooks__Filters'>
            <div className='SearchBooks__BookType'>
              <span className='bold'>Book Type:&nbsp;</span>
              <select name='book_type' id='book_type'>
                <option value='all'>All</option>
                <option value='partial'>Parts of the text viewable</option>
                <option value='full'>All text viewable</option>
                <option value='free-ebooks'>Free E-Books</option>
                <option value='paid-ebooks'>For Sale E-Books</option>
                <option value='ebooks'>All E-Books</option>
              </select>
            </div>
            
            <div className='SearchBooks__PrintType'>
              <span className='bold'>Print Type:&nbsp;</span>
              <select name='print_type' id='print_type'>
                <option value='none'>No Filter</option>
                <option value='all'>All</option>
                <option value='books'>Books only</option>
                <option value='magazines'>Magazines only</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  }
}