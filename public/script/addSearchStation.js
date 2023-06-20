const result = [];

fetch('/data/stationSearchList.csv')
    .then(response => response.text())
    .then(csvData => {
    // CSV 데이터 처리
    split = csvData.split('\n').reverse();
    set = new Set(split)
    // 컨테이너 요소 선택
    var station = document.getElementById("stationPrint");

    // 객체 배열을 순회하며 동적 객체 생성 및 추가
    set.forEach(ele => {
        if(ele === ''){ 
            return;
        }
        data = ele.split(', ');
        var dynamicElement = document.createElement("div");
        dynamicElement.innerHTML = `
            <ul>
                <li><h4>${data[0]}</h4></li>
                <li><input id=${data[2]} type="checkbox" value=${data[1]}></li>
            </ul>
            <p>${data[2]}</p>
        `;
        station.appendChild(dynamicElement);
        
    });

    })
    .catch(error => {
    console.error('Error:', error);
});


const stationPrint = document.getElementById("stationPrint");
// 상위 요소에 이벤트 리스너 등록
stationPrint.addEventListener('change', function(event) {
    const target = event.target;
    if (target.matches('input[type="checkbox"]')) {
        if (target.checked) {
            // 체크박스 요소 선택
            const checkbox = document.getElementById(target.id);

            // 체크박스의 상태를 로컬 스토리지에서 가져와 적용
            loadCheckboxState(checkbox.id, checkbox);

            // 체크박스의 상태가 변경되었을 때 이벤트 리스너 등록
            checkbox.addEventListener('change', handleCheckboxChange);
        } 
        else{
            // 체크박스 요소 선택
            const checkbox = document.getElementById(target.id);

            // 체크박스의 상태를 로컬 스토리지에서 가져와 적용
            loadCheckboxState(checkbox.id, checkbox);

            // 체크박스의 상태가 변경되었을 때 이벤트 리스너 등록
            checkbox.addEventListener('change', handleCheckboxChange);
        }
    }
});



// 체크박스의 상태를 로컬 스토리지에 저장
function saveCheckboxState(key, value) {
    localStorage.setItem(key, value);
}

// 체크박스의 상태를 로컬 스토리지에서 가져와 적용
function loadCheckboxState(key, checkbox) {
    if (!checkbox) {
        return; // checkbox 객체가 존재하지 않으면 함수 종료
    }

    const state = localStorage.getItem(key);
    if (state === 'true') {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;

    }
}

// 체크박스의 상태가 변경되었을 때 호출되는 함수
function handleCheckboxChange(event) {
    const target = event.target;
    saveCheckboxState(target.id, target.checked);
}

window.onload = function() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // i번째 키(key) 가져오기
        const checkbox = document.getElementById(key);
        loadCheckboxState(key, checkbox);
    }
    
};






