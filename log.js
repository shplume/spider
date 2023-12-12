const { appendFile } = require('node:fs');

const newLine = '\n';

function writeLog(fileName, msg) {
  appendFile(fileName, msg + newLine, err => {
    if (!err) {
      return;
    }

    console.log(err);
  });
}

module.exports = writeLog;
