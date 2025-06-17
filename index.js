
import { Cache } from './Src/Infrastructure/cache.js';
import { EventQueue } from './Src/Infrastructure/eventQueue.js';
import { createClient } from 'redis';
import { PriceController } from './Src/Controller/priceController.js';

// Simulate .env file (no internet to npm i dotenv!)
process.env.STREAM_KEY_READ = 'new-order';
process.env.STREAM_KEY_WRITE = 'price-factor';
process.env.GROUP_NAME = 'order_group';
process.env.CONSUMER_NAME = 'pricing_service';

// Load Dependencies
const redis = createClient();
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();

// Inject dependencies
const eventQueue = new EventQueue(redis, process.env.STREAM_KEY_READ, process.env.STREAM_KEY_WRITE, process.env.GROUP_NAME, process.env.CONSUMER_NAME);
await eventQueue.initStream();
const cache = new Cache(redis);
const priceController = new PriceController(cache, eventQueue);

// Start listening
await eventQueue.consumeEvent(priceController.newOrder.bind(priceController));
redis.quit();