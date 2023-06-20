export class Url{

    constructor(){
        this.stationByName = 'http://ws.bus.go.kr/api/rest/stationinfo/getStationByName';       // 정류소 명칭 검색
        this.routeByStation = 'http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation';     // 정류소고유번호를 입력받아 경유하는 노선목록을 조회한다.
        this.arrInfoByRouteAll = 'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll';    // 경유노선 전체 정류소 도착예정정보를 조회한다
        this.arrInfoByRoute = 'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute';          // 한 정류소의 특정노선의 도착예정정보를 조회한다
    }

    getStationByName(){
        return this.stationByName;
    }

    getRouteByStation(){
        return this.routeByStation;
    }

    getArrInfoByRouteAll(){
        return this.arrInfoByRouteAll;
    }

    getArrInfoByRoute(){
        return this.arrInfoByRoute;
    }
}