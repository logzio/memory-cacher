<p align="center">
  <a href="http://logz.io">
    <img height="150px" src="https://logz.io/wp-content/uploads/2017/06/new-logzio-logo.png">
  </a>
</p>


# memory-cacher

## Usage
  warper for the memory-cache with one a getOrSet
  that will get the cached value if it exists otherwise will set the return value from the cb
```javascript

const MemoryCache = require('memory-cache');

let result = await MemoryCacher.getOrSet(key, async () => {
  await delay(100);
  return 10;
}, 200);

result === 10

result = MemoryCacher.get(key);

result === 10

```
