<p align="center">
  <a href="http://logz.io">
    <img height="150px" src="https://logz.io/wp-content/uploads/2017/06/new-logzio-logo.png">
  </a>
</p>


# memory-cacher
get value from cache or from asynchronous getter,
it will also call the promise only once in case it will ask for the same key more than once
## Usage

@param {string} key
@param {asynchronous function} fn
@param {int} expiration
```javascript

const { MemoryCacher } = require('memory-cacher');

const key = 'key';

let result = MemoryCacher.getCached(key);

// result === null

result = await MemoryCacher.getCached(key, async () => {
  await delay(100);
  return 10;
}, 200);

// result === 10

result = MemoryCacher.getCached(key);

// result === 10

```
