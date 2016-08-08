'use strict';

let ips = {};
let app = require('express')();

app.enable('trust proxy');
app.route('/:name').get((req, res) => {
  let ip = ips[req.params.name];

  if (!ip)
    return res.status(404).send('Not found');

  res.send(ip);
}).put((req, res) => {
  ips[req.params.name] = req.ip;
  res.status(200).end();
});

app.listen(42514);