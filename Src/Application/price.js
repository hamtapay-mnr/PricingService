/**
 * @memberOf PricingService.Src.Application.price
 * @summary Calculate bought price
 * @description Calculate bought price with interest
 * @param {Number} amount amount of asset
 * @param {Number} assetPercentage percentage of current asset
 * @return {Promise<Object>} Promise
 */
export async function calculatePrice(amount, assetPercentage, cache) {
    let factor = 100;
    if (assetPercentage < 20)
        factor = 110;
    else if (assetPercentage < 50)
        factor = 105;
    const goldPrice = await cache.getPrice();
    return goldPrice * factor / 100;
}
/**
 * @memberOf PricingService.Src.Application.price
 * @summary Calculate current percentage
 * @description Calculate current percentage
 * @param {Number} amount amount of asset before deduction
 * @param {Number} amount amount of bought asset
 * @param {Object} cache cache object
 * @return {Promise<Object>} Promise
 */
export async function getInventoryAssetPercentage(amount, bought, cache) {
    const maxAsset = await cache.getMaxAsset();
    // console.log("Inventory: ", amount + "/" + maxAsset, " bought: ", bought);
    return {
        currentPercentage: (amount * 100) / maxAsset,
        afterDeductionPercentage: ((amount - bought) * 100) / maxAsset
    };
}
/**
 * @memberOf PricingService.Src.Application.price
 * @summary Put request in queue for next service to work
 * @description Put request in queue for next service to work
 * @param {Object} data data to enqueue!
 * @param {Object} queue queue object
 * @return {Promise<>} Promise 
 */
export async function addToQueue(data, eventQueue) {
    await eventQueue.publishEvent(data);
}