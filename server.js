const WSS = require('ws').Server;

const PORT = process.env.PORT || 8080;

const server = new WSS({ port: PORT });

console.log('Listen port ' + PORT + ' ...');

let delay = 1000;
server.on('connection', (socket) => {
  console.log('Opened connection ');

  var json = JSON.stringify({ message: 'Hi' });
  socket.send(json);
    
  let timer = setTimeout(broadcast, delay);

  socket.on('message', (message) => {
    console.log('Received: ' + message);
  });

  socket.on('close', () => {
    console.log('Closed Connection ');
  });

});

const min = 1;
const max = 5;
const multiplier = 1000;

const broadcast = () => {
  let json = JSON.stringify({
    value: 'any string'
  });

  server.clients.forEach(function each(client) {
    client.send(json);
    console.log('Sent: ' + json);
  });
   
  delay = Math.floor((Math.random() * max) + min) * multiplier;

  console.log("Delay is " + delay);
  timer = setTimeout(broadcast, delay);
}

