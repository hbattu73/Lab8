const formatVolumeIconPath = require('../assets/scripts/main');
// tests
describe('test function formatVolumeIconPath()', () => {
    test('volume value > 66', () => {
        expect(formatVolumeIconPath(67)).toBe('./assets/media/icons/volume-level-3.svg');
    });
    test('volume value > 33 ', () => {
        expect(formatVolumeIconPath(34)).toBe('./assets/media/icons/volume-level-2.svg');
    });
    test('volume value > 0', () => {
        expect(formatVolumeIconPath(1)).toMatch('./assets/media/icons/volume-level-1.svg');
    });
    test('volume value != none of the above', () => {
        expect(formatVolumeIconPath(0)).toContain('./assets/media/icons/volume-level-0.svg');
    });
});