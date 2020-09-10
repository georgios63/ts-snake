import { Interval } from '@/core';

describe('Interval test suite', () => {
  const RealDate = Date.now;
  const RealTimeout = setTimeout;

  beforeEach(() => {
    global.Date.now = RealDate;
    global.setTimeout = RealTimeout;
  });

  afterEach(() => {
    global.Date.now = RealDate;
    global.setTimeout = RealTimeout;
  });

  it('Calls the callback function with the deltaTime', () => {
    global.setTimeout = RealTimeout.bind(null, () => {});
    global.Date.now = () => 100;

    const callback = jest.fn((deltaTime: number) => {});
    const interval = new Interval(callback);

    interval.start();

    global.Date.now = () => 110;
    interval.tick(100);

    expect(callback.mock.calls[0][0]).toBe(0);
    expect(callback.mock.calls[1][0]).toBe(10);
    expect(callback.mock.calls.length).toBe(2);
  });
});
