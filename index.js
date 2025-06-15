
import { Cache } from './Src/Infrastructure/cache.js';
import { EventQueue } from './Src/Infrastructure/eventQueue.js';
import { createClient } from 'redis';
import { PriceController } from './Src/Controller/priceController.js';

// Load Dependencies
const redis = createClient();
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();

// Inject dependencies
const eventQueue = new EventQueue(redis);
await eventQueue.initStream();
const cache = new Cache(redis);
console.log(2222222222, cache);
const priceController = new PriceController(cache, eventQueue);

console.log("Start listening to order queue");
await eventQueue.consumeEvent(priceController.newOrder.bind(priceController));
redis.quit();