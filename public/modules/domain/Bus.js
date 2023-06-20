module.exports = class Bus {

    constructor(number, routeiId) {
        this.number = number;
        this.routeId = routeiId;
        this.createdAt = new Date();
        this.time = new Date();
    }

    setTime(){
        this.time.setDate();
    }

    getNumber() {
        return this.number;
    }

    getRouteId(){
        return this.routeId;
    }

    getCreatedAt(){
        return this.createdAt;
    }

    getTime(){
        return this.time();
    }
}