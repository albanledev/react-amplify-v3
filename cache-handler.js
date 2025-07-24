// cache-handler.js
module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
    this.cache = {};
  }

  async get(key) {
    return this.cache[key] || null;
  }

  async set(key, data) {
    this.cache[key] = data;
  }
};
