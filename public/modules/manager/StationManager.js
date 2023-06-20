const Station = require('../domain/Station');

module.exports = class StationManager {
    
    constructor() {
        
        this.staionList = {};
    }

    setStation(name, stationId, mobileId){
        this.staionList[name] = new Station(name, stationId, mobileId);
    }

    getStation(name) {
        return this.staionList[name].getName();
    }

    getString(name){
        return this.staionList[name].getName() + ', '
        +this.staionList[name].getStationId() + ', '
        +this.staionList[name].getMobileId();
    }

    isExist(name){
        return name in this.staionList;
    }
}
