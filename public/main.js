const socket = io.connect();

async function fetchTemplate(listItems, url, domElem) {
  const template = await fetch(url);
  const textTemplate = await template.text();
  const functionTemplate = Handlebars.compile(textTemplate);
  const html = functionTemplate({ listItems });
  document.querySelector(domElem).innerHTML = html;
}

const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const inputThumbail = document.querySelector('#thumbail');
const btnSend = document.querySelector('#send');

btnSend.addEventListener('click', addProduct);

function addProduct() {
  const newProduct = {
    title: inputTitle.value,
    price: inputPrice.value,
    thumbnail: inputThumbail.value,
  };

  socket.emit('new-product', newProduct);

  inputTitle.value = '';
  inputPrice.value = '';
  inputThumbail.value = '';
}

socket.on('productos', function (products) {
  fetchTemplate(products, '/templates/productos.hbs', '#productos');
});

socket.on('mensajes', function (mensajes) {
  fetchTemplate(mensajes, '/templates/chat.hbs', '#chat');
});
