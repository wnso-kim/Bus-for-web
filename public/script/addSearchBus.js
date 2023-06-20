const result = [];

fetch('/data/bus.csv')
    .then(response => response.text())
    .then(csvData => {
    // CSV 데이터 처리
    split = csvData.split('\n').reverse();
    set = new Set(split)
    // 컨테이너 요소 선택
    var bus = document.getElementById("busPrint");

    // 객체 배열을 순회하며 동적 객체 생성 및 추가
    set.forEach(ele => {
        if(ele === ''){ 
            return;
        }
        len = 'len'+ele.length;
        check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if(check.test(ele)){
            var dynamicElement = document.createElement("div");
            dynamicElement.innerHTML = `
            <h3 id=${len}>${ele}</h3>
            <p>서울 마을버스</p>
            `;
            bus.appendChild(dynamicElement);
        }
        else{
            var dynamicElement = document.createElement("div");
            dynamicElement.innerHTML = `
                <h3 id=${len}>${ele}</h3>
                <p>서울 지선버스</p>
            `;
            bus.appendChild(dynamicElement);
        }
        
    });

    })
    .catch(error => {
    console.error('Error:', error);
});