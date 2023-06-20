var localData = ''; // 로컬 데이터 값

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i); // i번째 키(key) 가져오기
  const value = localStorage.getItem(key); // 해당 키(key)에 저장된 값 가져오기
  if(value === 'false')
    continue;

  var code;
  if(key.length==4)
    code = '0' + key;
  else
    code = key;
  localData += key + ' ';
}

const url = '/?localData=' + localData;

fetch(url)
  .then(response => {
    if (response.headers.get('Content-Type').includes('application/json')) {
      return response.json(); // JSON 형식의 응답일 경우 파싱
    } else {
      return response.text(); // HTML 형식의 응답일 경우 텍스트로 받음
    }
  })
  .then(data => {
    // 서버에서 반환된 데이터 사용
    // console.log(data);
  })
  .catch(error => {
    // 오류 처리
    console.error(error);
  });


for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i); // i번째 키(key) 가져오기
  const value = localStorage.getItem(key); // 해당 키(key)에 저장된 값 가져오기
  if(value === 'false')
    continue;

  var code;
  if(key.length==4)
    code = '0' + key;
  else
    code = key;
  
  fetch('/data/' + code + '.csv')
    .then(response => response.text())
    .then(csvData => {
    // CSV 데이터 처리
    split = csvData.split('\n');
    set = new Set(split);
    
    // 컨테이너 요소 선택
    var station = document.getElementById("station");
    var dynamicElement = document.createElement("div");
    //객체 배열을 순회하며 동적 객체 생성 및 추가
    set.forEach(ele => {
      if(ele === ''){ 
          return;
      }

      else if(!ele.includes(',')){
        dynamicElement.innerHTML = `
          <div id="stationName">
            <h3>${ele}</h3>
          </div>
        `;
      }
      else{
        data = ele.split(', ');
        len = 'len'+data[0].length;

        dynamicElement.innerHTML += `
          <div class="container">
            <div class="left-div">
              <h3 id=${len}>${data[0]}</h3>
            </div>
            <div class="right-div">
              <ul id="countdowns">
                <li>${data[1]}</li>
                <li>${data[2]}</li>
              </ul>
            </div>
          </div>
        `;
      }
      
    });
    station.appendChild(dynamicElement);

    })
    .catch(error => {
    console.error('Error:', error);
});
}

//========================================================================
function startCountdown() {
  // 모든 li 요소 선택
  const liElements = document.querySelectorAll('#countdowns li');

  // 각 li 요소에 대해 카운트다운 수행
  liElements.forEach((li, index) => {
    let data = li.textContent.trim(); // li 요소의 데이터 가져오기

    // 데이터에서 분, 초, 번째 전 값을 추출
    let [minutes, seconds, before] = data.split(/[분초\[\]번째전]/g).filter(Boolean);

    // 분과 초를 정수로 변환
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    // 타이머 업데이트 함수
    function updateTimer() {
      // 분과 초가 0이면 타이머 종료
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        return;
      }

      // 초가 0이면 분을 감소시키고 초를 59로 설정
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      // 시간을 표시하는 요소 업데이트
      li.textContent = `${minutes}분 ${seconds}초 [${before}번째 전]`;
    }

    // 타이머 시작
    const timer = setInterval(updateTimer, 1000);
  });
}

// 페이지 로드 시 카운트다운 시작
window.addEventListener('DOMContentLoaded', startCountdown);
