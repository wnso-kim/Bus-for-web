const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

class StationFile {
  constructor() {}

  getStationName() {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '..', 'privateData', 'StationList.csv');
      const result = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            // console.log(data);
          result.push(data);
        })
        .on('end', () => {
          console.log('CSV Station file has been read');
          resolve(result);
        })
        .on('error', (error) => {
          console.error('Error occurred while reading the CSV file:', error);
          reject(error);
        });
    });
  }
}

module.exports = StationFile;