module.exports = class Station {

    constructor(name, stationId, mobileId){
        this.name = name;
        this.stationId = stationId;
        this.mobileId = mobileId;
        this.busList = [];
        this.createdAt = new Date();
    }

    setSusList(bus){
        busList = bus;
    }

    getName(){
        return this.name;
    } 

    getStationId(){
        return this.stationId;
    }

    getMobileId(){
        return this.mobileId;
    }

    getCreatedAt(){
        return this.createdAt;
    }
}

