import { updateIndexValues } from '../array.utils';

describe('Array Utils', () => {
  describe('updateIndexValues', () => {
    test('should update index values correctly when oldIndex < newIndex', () => {
      const items = [
        { index: 1, name: 'a' },
        { index: 2, name: 'b' },
        { index: 3, name: 'c' },
        { index: 4, name: 'd' },
        { index: 5, name: 'e' },
      ];
      const oldIndex = 2;
      const newIndex = 5;
      const expectedResult = [
        { index: 1, name: 'a' },
        { index: 2, name: 'c' },
        { index: 3, name: 'd' },
        { index: 4, name: 'e' },
        { index: 5, name: 'b' },
      ];

      const result = updateIndexValues(items, oldIndex, newIndex);

      expect(result).toEqual(expectedResult);
    });

    test('should update index values correctly when oldIndex > newIndex', () => {
      const items = [
        { index: 1, name: 'a' },
        { index: 2, name: 'b' },
        { index: 3, name: 'c' },
        { index: 4, name: 'd' },
        { index: 5, name: 'e' },
      ];
      const oldIndex = 4;
      const newIndex = 2;
      const expectedResult = [
        { index: 1, name: 'a' },
        { index: 2, name: 'd' },
        { index: 3, name: 'b' },
        { index: 4, name: 'c' },
        { index: 5, name: 'e' },
      ];

      const result = updateIndexValues(items, oldIndex, newIndex);

      expect(result).toEqual(expectedResult);
    });

    test('should update index values correctly when oldIndex equals newIndex', () => {
      const items = [
        { index: 1, name: 'a' },
        { index: 2, name: 'b' },
        { index: 3, name: 'c' },
        { index: 4, name: 'd' },
        { index: 5, name: 'e' },
      ];
      const oldIndex = 3;
      const newIndex = 3;
      const expectedResult = [
        { index: 1, name: 'a' },
        { index: 2, name: 'b' },
        { index: 3, name: 'c' },
        { index: 4, name: 'd' },
        { index: 5, name: 'e' },
      ];

      const result = updateIndexValues(items, oldIndex, newIndex);

      expect(result).toEqual(expectedResult);
    });
  });
});
