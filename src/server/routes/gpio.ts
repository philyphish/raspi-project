import * as express from 'express';
import * as gpio from 'rpi-gpio';
import * as WebSocket from 'ws';
import * as http from 'http';

const app = express();
const router = express.Router();
console.log('route loaded');

router
.route('/gpio')
.post((req, res, next) => {
    console.log('GET called');
    
    const server = http.createServer(app);
    const wss = new WebSocket({ server });

    wss.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
            console.log('recieved %s', message);

            wss.clients
                .forEach(client => {
                    if(client != ws) {
                        client.send(message);
                    }
                }); 
        });
        ws.send({"test": "this is a test"})
    });
});

module.exports = router;