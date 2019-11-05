import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import 'fetch-everywhere';
import dotenv from 'dotenv';
import getInitialHtml from './lib/getInitialHtml';
import App from './App';

// Load environment variables
dotenv.config();

// Setup app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('dist'));

app.get('/', async (req, res, next) => {
  if (req.method.toLowerCase() === 'get' && req.headers['Content-Type'] !== 'application/json') {
    const content = ReactDOMServer.renderToString(
      <App />
    );
    res.status(200).send(getInitialHtml(content));
  }

  next();
});

// Setup unhandled error handling
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection', err);
});

// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
