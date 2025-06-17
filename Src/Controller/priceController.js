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
        console.log("Recieved new order: ", orderObj);

        const percentage = await Price.getInventoryAssetPercentage(orderObj.currentInventory, orderObj.bought, this.cache);
        const price = await Price.calculatePrice(orderObj.bought, percentage.currentPercentage, this.cache);
        const notifierObj = { amount: orderObj.bought, username: orderObj.username, price, remainingGoldPercentage: percentage.afterDeductionPercentage };

        console.log("Send order to notifier: ", notifierObj);
        Price.addToQueue(notifierObj, this.eventQueue);
    }
}