import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import SearchBrowse from '../client/src/search/SearchBrowse.jsx';
import rentals from '../client/src/data/exampleRentals.js';
import categories from '../client/src/data/categories.js';
import controllers from '../server/controllers/browse.controllers.js';


describe ('Axios requests function properly', () => {
  const supertest = require('supertest');
  const server = require('../server/index.js');

  test('GET items request is successful', async () => {
    await supertest(server)
      .get('/browse/items')
      .send('hammer')
      .expect(200)
      .then((response) => {
        expect(response).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  test('GET lat/lng from zip code search', async () => {
    await supertest(server)
      .get('/browse/location')
      .query({ components: 'postal_code:94085' })
      .expect(200)
      .then((response) => {
        expect(response).toBeDefined();
      });
    await supertest(server)
      .get('/browse/location')
      .query({ components: 'postal_code:9485' })
      .expect(500)
      .then((response) => {
        expect(response).toBeDefined();
      });
  });

  test('GET related words from keyword search', async () => {
    await supertest(server)
      .get('/browse/relatedWords')
      .query({ keyword: 'hammer' })
      .expect(200)
      .then((response) => {
        expect(response).toBeDefined();
        expect(response.body.length).toBe(10);
      });
  });
});


describe('search and browse functionality', () => {
  const server = setupServer(
    rest.get('/browse/items', (req, res, ctx) => {
      return res(ctx.json(rentals));
    }),
    rest.get('/browse/location', (req, res, ctx) => {
      return res(ctx.json({lat: 37.38860, lng: -122.01678}));
    }),
    rest.get('/browse/relatedWords', (req, res, ctx) => {
      return res(ctx.json([{word: 'hammer'}]));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should render all search method options', () => {
    const {rerender} = render(<BrowserRouter><SearchBrowse/></BrowserRouter>);
    expect(screen.getByText('Keyword').toBeInTheDocument);
    expect(screen.getByText('Location').toBeInTheDocument);
    expect(screen.getByText('Availability').toBeInTheDocument);
    expect(screen.getByText('Category').toBeInTheDocument);
  });

  test('Should filter results by Keyword', async () => {
    const {rerender} = render(<BrowserRouter><SearchBrowse/></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('Barbeque')).toBeInTheDocument();
      expect(screen.getByText('Hammer')).toBeInTheDocument();
    });

    const input = screen.getByLabelText('keyword-search');

    fireEvent.change(input, {target: {value: 'Hammer'}});
    await waitFor(() => {
      expect(screen.getAllByText('Hammer').length).toBeGreaterThan(0);
    });
    expect(!screen.getByText('Mop'));

    fireEvent.change(input, {target: {value: ''}});
    await waitFor(() => {
      expect(screen.getByText('Hammer')).toBeInTheDocument();
    });
    expect(screen.getByText('Mop')).toBeInTheDocument();

    fireEvent.change(input, {target: {value: 'mallet'}});
    await waitFor(() => {
      expect(screen.getAllByText('Hammer').length).toBeGreaterThan(0);
    });
    expect(!screen.getByText('Mop'));
  });
});