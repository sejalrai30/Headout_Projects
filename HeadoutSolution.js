const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();
const PORT = 8080;

app.get('/data', (req, res) => {
  const fileName = req.query.n;
  const lineNumber = req.query.m;

  if (!fileName) {
    return res.status(400).send('Parameter n (file name) is required.');
  }

  const filePath = `/tmp/data/${fileName}.txt`;

  if (lineNumber) {
    // Return content of file at the specified line
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let currentLine = 0;

    rl.on('line', (line) => {
      currentLine++;
      if (currentLine == lineNumber) {
        rl.close();
        res.send(line);
      }
    });

    rl.on('close', () => {
      if (currentLine < lineNumber) {
        res.status(400).send(`File ${fileName}.txt does not have ${lineNumber} lines.`);
      }
    });
  } else {
    // Return entire content of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
