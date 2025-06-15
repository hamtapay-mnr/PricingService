import * as Price from '../Application/price.js';
export class PriceController {
    constructor(cache, eventQueue) {
        this.cache = cache;
        this.eventQueue = eventQueue;
    }
    /**
     * @memberOf PricingService.Src.Controller.priceController
     * @summary Retrive an order from queue and process it
     * @description Retrive an order from queue and process it
     * @param {Object} orderObj order object
     * @return {Promise} Promise 
     */
    async newOrder(orderString) {
        const orderObj = JSON.parse(orderString.data);
        console.log("xcccccccccccc", orderObj);
        // throw "e";
        const percentage = await Price.getInventoryAssetPercentage(orderObj.currentInventory, orderObj.bought, this.cache);
        const price = await Price.calculatePrice(orderObj.bought, percentage.currentPercentage, this.cache);
        const notifierObj = { price, remainingGoldPercentage: percentage.afterDeductionPercentage };
        console.log("11111111111", notifierObj);
        Price.addToQueue(notifierObj, this.eventQueue);
    }
}