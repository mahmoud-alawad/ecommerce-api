import { createClient } from 'redis';

const REDIS_PORT = (process.env.REDIS_PORT as string) || '6379';
const redisURL = `redis://@redis:6379`;


const client = createClient({ url: redisURL });

client.on('connect', () => console.log('Cache is connecting'));
client.on('ready', () => console.log('Cache is ready'));
client.on('end', () => console.log('Cache disconnected'));
client.on('reconnecting', () => console.log('Cache is reconnecting'));
client.on('error', (e) => console.error(e));

(async () => {
  await client.connect();
})();

// If the Node process ends, close the Cache connection
process.on('SIGINT', async () => {
  await client.disconnect();
});

export default client;
