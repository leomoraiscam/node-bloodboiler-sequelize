const Redis = require('ioredis');

const config = require('../config/env').redis;

const redis = new Redis(config.port, config.host);

module.exports = {
  async set(key, value) {
    return redis.set(key, JSON.stringify(value));
  },

  async recover(key) {
    const data = await redis.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    return parsedData;
  },

  async invalidate(key) {
    await redis.del(key);
  },

  async invalidatePrefix(prefix) {
    const keys = await redis.keys(`${prefix}:*`);

    const pipeline = await redis.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  },
};
