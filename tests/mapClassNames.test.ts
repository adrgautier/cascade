import { describe, it, expect } from 'vitest';
import { mapClassNames } from '../src/mapClassNames';

describe('mapClassNames', () => {
    it('should map class names according to the provided map', () => {
        const classNamesMap = {
            'btn': 'button',
            'txt': 'text'
        };
        const classNameString = 'btn txt';
        const result = mapClassNames(classNamesMap)(classNameString);
        expect(result).toBe('button text');
    });

    it('should return the original class name if it is not in the map', () => {
        const classNamesMap = {
            'btn': 'button'
        };
        const classNameString = 'btn unknown';
        const result = mapClassNames(classNamesMap)(classNameString);
        expect(result).toBe('button unknown');
    });

    it('should handle an empty class name string', () => {
        const classNamesMap = {
            'btn': 'button'
        };
        const classNameString = '';
        const result = mapClassNames(classNamesMap)(classNameString);
        expect(result).toBe('');
    });

    it('should handle an empty class names map', () => {
        const classNamesMap = {};
        const classNameString = 'btn txt';
        const result = mapClassNames(classNamesMap)(classNameString);
        expect(result).toBe('btn txt');
    });
});