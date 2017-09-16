let app = require('express')()
  , ips = {};

app.enable('trust proxy');
app.route('/:name').get((req, res) => {
  let info = ips[req.params.name];

  if (!info) {
    res.sendStatus(404);
    return;
  }

  res.header('X-Updated', info.time).send(info.ip);
}).put((req, res) => {
  ips[req.params.name] = {
    ip: req.ip,
    time: new Date().toUTCString()
  };
  res.status(200).end();
});

app.listen(42514);
