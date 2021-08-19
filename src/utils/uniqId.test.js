import { uniqId } from './uniqId';

describe('uniqId', () => {
  test('generates a string', () => {
    expect(typeof uniqId() === 'string').toBeTruthy();
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
