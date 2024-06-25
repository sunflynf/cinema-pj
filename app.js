import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;
const app = express();

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
  res.sendFile(__dirname + '/public/index.html');
  //   res.send('Hello my fen!');
});

app.get('/hello', (req, res) => {
  res.render('index.ejs', {
    name: req.query['name'],
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
  res.status(200);
  res.json({ hello: "it's me" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
