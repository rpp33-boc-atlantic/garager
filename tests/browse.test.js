import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBrowse from '../client/src/search/SearchBrowse.jsx';
import rentals from '../client/src/data/exampleRentals.js';
import categories from '../client/src/data/categories.js';

const supertest = require('supertest');
const server = require('../server/index.js');

describe ('SearchBrowse retrieves all items', () => {
  test('GET items request is successful', async () => {
    await supertest(server)
      .get('/browse/items')
      .expect(200)
      .then((response) => {
        expect(response).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
});

const filteredCategories = Object.keys(categories);

describe('Search Column', () => {
  test('Should render all search method options', () => {
    render(<BrowserRouter><SearchBrowse rentals={rentals} categories={filteredCategories}/></BrowserRouter>);
    expect(screen.getByText('Keyword').toBeInTheDocument);
    expect(screen.getByText('Location').toBeInTheDocument);
    expect(screen.getByText('Availability').toBeInTheDocument);
    expect(screen.getByText('Category').toBeInTheDocument);
  });

  test('Should filter results by Keyword', () => {
    render(<BrowserRouter><SearchBrowse rentals={rentals} categories={filteredCategories}/></BrowserRouter>);
    expect(screen.getByText('Barbeque').toBeInTheDocument);
    expect(screen.getByText('Hammer').toBeInTheDocument);
    const input = screen.getByLabelText('keyword-search');
    act(() => {
      fireEvent.change(input, {target: {value: 'hammer'}});
    });
    !expect(screen.findByText('Barbeque').toBeInTheDocument);
    expect(screen.findByText('Hammer').toBeInTheDocument);
    act(() => {
      fireEvent.change(input, {target: {value: ''}});
    });
    expect(screen.findByText('Barbeque').toBeInTheDocument);
    expect(screen.findByText('Hammer').toBeInTheDocument);
    act(() => {
      fireEvent.change(input, {target: {value: 'mallet'}});
    });
    !expect(screen.findByText('Barbeque').toBeInTheDocument);
    expect(screen.findByText('Hammer').toBeInTheDocument);
  });

  test('Should filter results by Zipcode radius', () => {
    render(<BrowserRouter><SearchBrowse rentals={rentals} categories={filteredCategories}/></BrowserRouter>);
    expect(screen.getByText('Barbeque').toBeInTheDocument);
    expect(screen.getByText('Hammer').toBeInTheDocument);
    expect(screen.getByText('Mop').toBeInTheDocument);
    expect(screen.getByText('Soccer Goals').toBeInTheDocument);
    const dropdown = screen.getByTestId('distance');
    const input = screen.getByLabelText('zipcode-search');
    act(() => {
      fireEvent.change(dropdown, {target: {value: 25}});
      fireEvent.change(input, {target: {value: 94085}});
    });
    expect(screen.findByText('Barbeque').toBeInTheDocument);
    expect(screen.findByText('Hammer').toBeInTheDocument);
    expect(screen.findByText('Mop').toBeInTheDocument);
    expect(screen.findByText('Soccer Goals').toBeInTheDocument);
  });
});

describe('Browse Column', () => {
  render(<BrowserRouter><SearchBrowse rentals={rentals} categories={filteredCategories}/></BrowserRouter>);
  const dropdown = screen.getByTestId('sort-methods');

  // test('Sorts items by price; low to high', async () => {
  //   fireEvent.change(dropdown, {target: {value: 'price-low-high'}});
  //   await (waitFor(() => {
  //     const items = screen.getAllByTestId('rental-title');
  //     expect(items[0].toHaveTextContent('Hammer'));
  //     expect(items[1].toHaveTextContent('Mop'));
  //     expect(items[2].toHaveTextContent('Barbeque'));
  //     expect(items[3].toHaveTextContent('Soccer Goals'));
  //   }));
  // });
  // test('Sorts items by price; high to low')
  // test('Sorts items by popularity; low to high')
  // test('Sorts items by popularity; high to low')
  // test('Sorts items by alphabet; low to high')
  // test('Sorts items by alphabet; high to low')


});

{/* <option value="price-low-high">Price: Low to High</option>
<option value="price-high-low">Price: High to Low</option>
<option value="alphabet-a-z">Alphabet: A to Z</option>
<option value="alphabet-z-a">Alphabet: Z to A</option>
<option value="popular-low-high">Popular: Low to High</option>
<option value="popular-high-low"> */}