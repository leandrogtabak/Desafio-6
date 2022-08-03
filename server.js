const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

const PORT = 8080;

const productos = [
  { title: 'Calculadora', price: '$123.45', thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png', id: 1 },
  { title: 'Escuadra', price: '$243.56', thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png', id: 2 },
  { title: 'Reloj', price: '$345', thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png', id: 3 },
];

const mensajes = [
  { name: 'Carlos', message: 'Hola!' },
  { name: 'Juan', message: 'Bien! Vos?' },
  { name: 'Carlos', message: 'Todo bien por suerte!' },
];

httpServer.listen(PORT, function () {
  console.log('Servidor corriendo en http://localhost:8080');
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.emit('productos', productos);
  socket.emit('mensajes', mensajes);

  socket.on('new-product', (newProduct) => {
    const id = productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1;

    const productoAGuardar = { ...newProduct, id: id };
    productos.push(productoAGuardar);

    io.sockets.emit('productos', productos);
  });
});

httpServer.on('error', (error) => console.log(`Error en el servidor: ${error}`));
