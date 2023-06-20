const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

class BusFile {
  constructor() {}

  getBusId() {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '..', 'privateData', 'BusId.csv');
      const result = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          result.push(data);
        })
        .on('end', () => {
          console.log('CSV Bus file has been read');
          resolve(result);
        })
        .on('error', (error) => {
          console.error('Error occurred while reading the CSV file:', error);
          reject(error);
        });
    });
  }
}

module.exports = BusFile;