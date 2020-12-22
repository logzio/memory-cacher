const MemoryCache = require('memory-cache');

class PendingPromiseCache {
  constructor({ log = () => { } } = {}) {
    this.cache = {};
    this._log = log;
  }

  get(key, getter) {
    if (!this.cache[key]) {
      this._log(`Saved promise in cache: ${key}`);
      this.cache[key] = getter();
    } else {
      this._log(`Getting promise from cache: ${key}`);
    }

    return this.cache[key].finally(() => {
      delete this.cache[key];
    });
  }
}

const pendingPromises = new PendingPromiseCache();

class MemoryCacher {
  static async getCached(key, creator, expiration) {
    const existingVal = MemoryCache.get(key);

    if (existingVal !== null && existingVal !== undefined) {
      return existingVal;
    }

    const promise = pendingPromises.get(key, creator);
    // Wait for the creator to fulfill/ reject
    const value = await promise;

    MemoryCache.put(key, value, expiration);

    // Return the value, since this is a getter
    return value;
  }

  static put(key, value, expiration) {
    MemoryCache.put(key, value, expiration);
  }
}

module.exports = {
  MemoryCacher,
};
