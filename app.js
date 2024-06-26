import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import db from './db/database.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;
const app = express();

app.use(express.static('public'));
// setup for get req.body
app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(morgan('tiny'));
// custom middleware
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

app.get('', (req, res) => {
  // res.sendFile(__dirname + '/public/index.html');
  //   res.send('Hello my fen!');
  res.render('index.ejs', {
    title: 'Well done!',
    // user: undefined,
    // user: { name: 'Fi' },
    items: ['apple', 'banana', 'dragon fruit', 'mango', 'orange'],
    date: new Date().toLocaleDateString(),
  });
});

app.get('/about', (req, res) => {
  res.send('My name is ...!');
});

app.post('/send', (req, res) => {
  res.json({ status: 'ok' });
});

// REST
app.get('/endpoint', (req, res) => {
  const info = {
    status: 'ok',
    data: [
      { value: 1, label: 'Football' },
      { value: 2, label: 'Futball' },
      { value: 3, label: 'Soccer' },
      { value: 4, label: 'Bóng đá' },
    ],
    rate: 3,
  };

  res.status(200).json(info);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
