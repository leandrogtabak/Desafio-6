const template = await fetch('/templates/products.hbs');
const textTemplate = await template.text();
const functionTemplate = Handlebars.compile(textTemplate);
const html = functionTemplate({ products });
document.querySelector('#products').innerHTML = html;

//usar cdn

<script
  src='https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js'
  integrity='sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg=='
  crossorigin='anonymous'
  referrerpolicy='no-referrer'
></script>;
