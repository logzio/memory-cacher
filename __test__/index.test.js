const { MemoryCacher } = require('../src');

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('Test memory cacher', () => {
  it('test getCached', async (next) => {
    const key = 'key';
    let result = MemoryCacher.get(key);
    expect(result).toBeNull();
    result = await MemoryCacher.getCached(key, async () => {
      await delay(100);
      return 10;
    }, 200);

    expect(result).toBe(10);
    result = MemoryCacher.get(key);
    expect(result).toBe(10);
    await delay(300);
    result = MemoryCacher.get(key);
    expect(result).toBeNull();
    next();
  });
});
