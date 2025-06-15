
import { Cache } from './Src/Infrastructure/cache.js';
import { EventQueue } from './Src/Infrastructure/eventQueue.js';
import { createClient } from 'redis';

// Load Dependencies
const redis = createClient();
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();

// Inject dependencies
const eventQueue = new EventQueue(redis);
await eventQueue.initStream();
const cache = new Cache(redis);