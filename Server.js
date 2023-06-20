//==========================================================
// Server Init
const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
// const hostname = '10.41.15.57';
// const port = 3000;
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  const localData = req.query.localData || '';
  const values = localData.split(' ').filter(value => value.trim() !== '');
  values.forEach(ele => api(ele));

  const mainPath = path.join(__dirname, 'public', 'html', 'main.html');
  res.sendFile(mainPath);
  console.log('main');
});

const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//============================================================
function api(number){
  // API base
  if(number.length==4)
    number = '0'+number;
  var url = 'http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid';
  var serviceKey = 'q4WXxRcF5QXyItAWIfO5wgC8m363kiaFDL4Tv%2B627zq6oH9GxE%2BW1QtvpvMUGaadExMGxbIq%2FYncfSLtN9L%2BrQ%3D%3D';
  var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
  queryParams += '&' + encodeURIComponent('arsId') + '=' + encodeURIComponent(number); /* */
  //==========================================================
  // API func
  request({
    url: url + queryParams,
    method: 'GET'
    }, function (error, response, body) {
      // XML 파서 생성
      var xml2js = require('xml2js');
      var parser = new xml2js.Parser();
        
      // XML 파싱
      parser.parseString(body, function (err, result) {
        if (err) {
            console.error('XML 파싱 오류:', err);
            return;
        }
        
        // 파싱된 결과인 JavaScript 객체 사용
        // /public/data 디렉토리에 데이터 저장
        // 파일이름 => number.csv
        data = result.ServiceResult.msgBody[0].itemList;

        fs = require('fs');
        csvFilePath = './public/data/'+ number +'.csv';
        
        add = '' + data[0].stNm[0] + '\n';
        for(i=0; i<data.length; i++)
          add = add + data[i].rtNm[0] + ', ' + data[i].arrmsg1[0] + ', ' + data[i].arrmsg2[0] + '\n';

        csvData = fs.writeFile(csvFilePath, add,function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      });
  });

}
//============================================================
// Bus 객체 생성
const BusManager = require('./public/modules/manager/BusManager');
const bus = new BusManager();           // global bus 객체 생성

const BusFile = require('./public/script/readBusFile');
const busFile = new BusFile();

busFile.getBusId()  // global bus 객체에 버스 저장
  .then((result) => {
    // 결과 처리
    result.forEach((data) => {
        bus.setBus(Object.values(data)[0], Object.values(data)[1]);
    });
    // console.log(bus.getBus('2230'));
  })
  .catch((error) => {
    // 에러 처리
    console.error(error);
  });
//============================================================
// Global Bus 객체 반환(검색)
app.post('/bus', (req, res) => {
    let data = req.body;
    if(bus.isExist(data['number'])){
        add = data['number']+ '\n';
        fs = require('fs');
        csvFilePath = './public/data/bus.csv';
        csvData = fs.appendFile(csvFilePath, add,function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        
        console.log(csvData);   
    }
    busPath = path.join(__dirname, 'public', 'html', 'searchBus.html');
    res.sendFile(busPath);

    // 추가 작업 수행
}); 


//============================================================
// Station 객체 생성
const StaionManager = require('./public/modules/manager/StationManager');
const station = new StaionManager();           // global bus 객체 생성

const StationFile = require('./public/script/readStationFile');
const staionFile = new StationFile();

staionFile.getStationName()  // global bus 객체에 버스 저장
  .then((result) => {
    // 결과 처리
    result.forEach((data) => {
        station.setStation(Object.values(data)[0], Object.values(data)[1], Object.values(data)[2]);
    });
    // console.log(station.getStation('서일대학교'));
  })
  .catch((error) => {
    // 에러 처리
    console.error(error);
  });
//============================================================
// Global Station 객체 반환(검색)
app.post('/station', (req, res) => {
  let data = req.body['stationName'];

  if(station.isExist(data)){
      add = station.getString(data)+ '\n';
      fs = require('fs');
      csvFilePath = './public/data/stationSearchList.csv';
      csvData = fs.appendFile(csvFilePath, add,function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
      });
      
      console.log(csvData);   
  }
  stationPath = path.join(__dirname, 'public', 'html', 'searchStation.html');
  res.sendFile(stationPath);

  // 추가 작업 수행
}); 



