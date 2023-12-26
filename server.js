const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = false/*process.env.NODE_ENV !== 'production'*/;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/floreriapenelope.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/floreriapenelope.com/cert.pem')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(443, err => {
    if (err) throw err;
    console.log('> Server started on https://localhost:443');
  });
});