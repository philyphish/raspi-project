import * as createError from 'http-errors';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as gpio from 'rpi-gpio';
import * as log4js from 'log4js';

const app = express();
const port = 3000;
const clientPath = 'dist/src/client';
const indexFilePath = path.join(clientPath, 'index.html');
const server = http.createServer(app);
const pin = 11;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(clientPath));


// Client Path
app.get('/*', (req, res) => 
res.sendFile(indexFilePath, { root: './' },)
);

//gpio.setup(pin, gpio.DIR_IN, readInput);

// function readInput(err) {
//   if (err) throw err;
//   gpio.read(pin, function(err, value){
//     if(err) throw err;
//     console.log(`Pin ${pin} value is ${value}`);
//   });
// }
  gpio.setup(pin, gpio.DIR_OUT, write);

  function write(err){
    if(err) throw err;
    gpio.write(pin, false, function(err) {
      if(err) throw err;
      console.log(`Write to Pin ${pin}`);
    });
  };
  
const wss = new WebSocket.Server({ server: server, path: '/raspi/gpio' });
wss.on('connection', (ws: WebSocket) => {
  console.log('Connected!');

  // let gpioState = gpio.read(pin, readInput);
  let gpioState = false;

  ws.send(`{"message":"State of GPIO is"}`);

  ws.on('message', (message: string) => {
    console.log('recieved: %s', message);
    let messageJSON = JSON.parse(message); 
    messageJSON.message === 'on' ? gpio.write(pin, true) : gpio.write(pin, false, write);;
    
    ws.send(message);
    // wss.clients
    // .forEach(client => {
      //   if(client != ws) {
        //     client.send(message);
        //   }
        // }); 
      });
    });

server.listen(port, () => {
    console.log('Listening on port ' + port);
  });
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
