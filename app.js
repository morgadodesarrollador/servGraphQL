'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  console.log('hola caracola');
  res.send('<h1> Jose Antonio Morgado Berruezo</h1>\n');
  
});

app.listen(PORT, HOST);
console.log(`Aplicación corriendo en: http://${HOST}:${PORT}`);
