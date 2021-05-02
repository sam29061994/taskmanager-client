const express = require('express');
const serverStatic = require('static');
const path = require('path');

const app = express();
app.use('/', serverStatic(path.join(__dirname, '/dist')));

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
});

const port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`app is listening on port ${port}`) })