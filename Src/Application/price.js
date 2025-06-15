/**
 * @memberOf PricingService.Src.Application.price
 * @summary Deduct a amount from inventory
 * @description Get a value and deduct it from inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise
 */
export function updatePrice(amount, cache) {
    return cache.decreaseAsset(amount);
}
/**
 * @memberOf PricingService.Src.Application.price
 * @summary Deduct a amount from inventory
 * @description Get a value and deduct it from inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise
 */
export function calculatePrice(amount, cache) {
    return cache.decreaseAsset(amount);
}
/**
 * @memberOf PricingService.Src.Application.price
 * @summary Deduct a amount from inventory
 * @description Get a value and deduct it from inventory
 * @param {Number} amount amount of asset
 * @return {Promise<Object>} Promise
 */
export function getInventoryAssetPercentage(amount, cache) {
    return cache.decreaseAsset(amount);
}