const Bus = require('../domain/Bus');

module.exports = class BusManager {
    
    constructor() {
        
        this.busList = {};
    }

    setBus(number, routeId){
        this.busList[number] = new Bus(number, routeId);
    }

    getBus(number) {
        return this.busList[number].getNumber();
    }

    isExist(number){
        return number in this.busList;
    }
}
