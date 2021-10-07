const fs = require('fs');
const BracketService = require('./bracket-service')

const inputFile = process.argv[2];

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }
  try {
    BracketService.checkBrackets(data);
  } catch (error) {
    console.error('\x1b[1m%s', error.message);
  }
});
