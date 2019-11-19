import React from 'react';
import './book.css';
import noImage from './imageNotAvail.png';

export default function Book(props) {
  const AUTHORS = props.book.volumeInfo.authors 
    ? props.book.volumeInfo.authors.map (author => author + ', ')
    : '';

  const PRICE = props.book.saleInfo.saleability === 'FOR_SALE' 
    ? `$ ${props.book.saleInfo.retailPrice.amount} ${props.book.saleInfo.retailPrice.currencyCode}`
    : 'Not for Sale';

  const THUMBNAIL = typeof props.book.volumeInfo.imageLinks !== 'undefined' 
    ? <img src={props.book.volumeInfo.imageLinks.thumbnail} alt={props.book.volumeInfo.title} />
    : <img src={noImage} alt='No Image Available' />;

  return (
    <div className='Book'>
      <div className='image'>
        {THUMBNAIL}
      </div>
      <div className='information'>
        <h2>
          {props.book.volumeInfo.title}
        </h2>
        <p className='author'>
          {AUTHORS > '' ? <span className="bold">Author: </span> : ''}
          { AUTHORS }
        </p>
        <p className='price'>
          <span className='bold'>Price: </span>
          { PRICE } 
        </p>
        <p className='description'>
          {props.book.volumeInfo.description}
        </p>
      </div>
    </div>
  )
}