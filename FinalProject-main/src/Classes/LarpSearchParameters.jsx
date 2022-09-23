export default class LarpSearchParameters{
    constructor(title,tags,hasFood,hasSleep,paymentStartRng,paymentEndRng,dateStart,dateEnd,country){
        this.title = title;
        this.tags=tags;
        this.hasFood=hasFood;
        this.hasSleep=hasSleep;
        this.paymentStartRng=paymentStartRng;
        this.paymentEndRng=paymentEndRng;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.country = country;
    }
}