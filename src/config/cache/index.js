const { redis } = require('../env');

module.exports = {
  host: redis.host,
  port: redis.port,
};
