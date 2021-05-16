const express = require('express');

const app = express();

const port = process.env.PORT || 3333;

app.use('/', express.static(__dirname + '/public'));

function decryptQueryParams(req, res, next) {
  let encryptedData = req.query.code;
  let decryptedData = '';
  for (let i = 0; i < encryptedData.length; i++) {
    if (
      encryptedData.charCodeAt(i) >= 97 &&
      encryptedData.charCodeAt(i) <= 122
    ) {
      decryptedData += encryptedData[i].toUpperCase();
    } else if (
      encryptedData.charCodeAt(i) >= 65 &&
      encryptedData.charCodeAt(i) <= 96
    ) {
      decryptedData += encryptedData[i].toLowerCase();
    } else {
      decryptedData += encryptedData[i];
    }
  }

  req.query.code = decryptedData;
  next();
}

function decodeQueryBase64(req, res, next) {
  for (let q in req.query) {
    let data = req.query[q];
    data = Buffer.from(data, 'base64').toString('utf-8');
    req.query[q] = data;
  }
  next();
}

app.get('/eval', decryptQueryParams, decodeQueryBase64, (req, res) => {
  try {
    var result = eval(`${req.query.code}`).toString();
  } catch (e) {
    res.send(
      '<h1>Error! Please Enter Valid JS supported by eval function</h1>'
    );
  }
  res.send(`<h1>${result}</h1>`);
});

app.get('/', (req, res) => {
  res.redirect('/eval');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
