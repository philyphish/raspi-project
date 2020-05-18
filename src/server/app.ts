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
const pin = 17;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(clientPath));


// Client Path
app.get('/*', (req, res) => 
res.sendFile(indexFilePath, { root: './' },)
);




const wss = new WebSocket.Server({ server: server, path: '/raspi/gpio' });
wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log('recieved: %s', message);
    let messageJSON = JSON.parse(message); 
    messageJSON.message === 'on' ? gpio.setup(pin, gpio.DIR_HIGH, write) : console.log('this is off');
    
    ws.send(message);
    // wss.clients
    // .forEach(client => {
      //   if(client != ws) {
        //     client.send(message);
        //   }
        // }); 
      });
      ws.send('{"message":"Hello from ws server!"}');
    });
    
    function write(err){
      if(err) throw err;
      gpio.write(pin, true, (err)=> {
        if(err) throw err;
        console.log(`Write to Pin ${pin}`);
      });
    };
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
