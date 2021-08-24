import { uniqId } from './uniqId';

describe('uniqId', () => {
  test('generates a string', () => {
    expect(typeof uniqId() === 'string').toBeTruthy();
  });

  test('generates a with prowided length', () => {
    expect(uniqId().length).toBe(12);
    expect(uniqId(10).length).toBe(10);
    expect(uniqId(2).length).toBe(2);
    expect(uniqId(999).length).toBe(999);
  });

  test('string is really unique', () => {
    expect(uniqId()).not.toEqual(uniqId());
    expect(uniqId()).not.toEqual(uniqId());
    expect(uniqId()).not.toEqual(uniqId());
    expect(uniqId()).not.toEqual(uniqId());
    expect(uniqId()).not.toEqual(uniqId());
    expect(uniqId()).not.toEqual(uniqId());
  });
});
