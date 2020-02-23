// const app = require('./app');
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

global.__root = __dirname + '/';

//Enabling Morgan
app.use(require('morgan')('common'));

const config = require('./config');
const { PORT, DB_URL } = config;

let server;

mongoose.Promise = global.Promise;

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', routes);


//Catch all endpoint if client makes request to non existent end point
app.use('*', function (req, res) {
  res.status(404).json({ message: 'Route Not Found' });
});


// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run

//connect db on server start

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Recipe Server is listening to port ${port}`);
            resolve();
          })
          .on('error', error => {
            mongoose.disconnect();
            reject(err);
          });
      }
    )
  })
}

//Closing the server
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DB_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };