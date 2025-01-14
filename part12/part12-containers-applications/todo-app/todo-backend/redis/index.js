const redis = require('redis');
const { promisify } = require('util');
const { REDIS_URL } = require('../util/config');

let getAsync;
let setAsync;

if (!REDIS_URL) {
  console.log('No REDIS_URL set, Redis is disabled');
  getAsync = () => null;
  setAsync = () => null;
} else {
  const client = redis.createClient({
    url: REDIS_URL,
  });

  getAsync = promisify(client.get).bind(client);
  setAsync = promisify(client.set).bind(client);
}

module.exports = {
  getAsync,
  setAsync,
};
