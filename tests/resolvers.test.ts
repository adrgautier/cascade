import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resolveValue, resolveString, resolveArray, resolveObject } from '../src/resolvers';

beforeEach(() => {
    vi.resetAllMocks();
});

describe('resolveValue', () => {
    const addFn = vi.fn();

    it('should handle string argument', () => {
        resolveValue(addFn, 'class1 class2');
        expect(addFn).toHaveBeenCalledWith('class1');
        expect(addFn).toHaveBeenCalledWith('class2');
    });

    it('should handle array argument', () => {
        resolveValue(addFn, ['class1', 'class2']);
        expect(addFn).toHaveBeenCalledWith('class1');
        expect(addFn).toHaveBeenCalledWith('class2');
    });

    it('should handle object argument', () => {
        resolveValue(addFn, { class1: true, class2: 'predicate' });
        expect(addFn).toHaveBeenCalledWith('class1');
        expect(addFn).toHaveBeenCalledWith('predicate', 'class2');
    });

    it('should return if args is falsy', () => {
        resolveValue(addFn, null);
        expect(addFn).not.toHaveBeenCalled();
    });
});

describe('resolveString', () => {
    const addFn = vi.fn();

    it('should split and add class names', () => {
        resolveString(addFn, 'class1 class2');
        expect(addFn).toHaveBeenCalledWith('class1');
        expect(addFn).toHaveBeenCalledWith('class2');
    });
});

describe('resolveArray', () => {
    const addFn = vi.fn();

    it('should resolve each element in the array', () => {
        resolveArray(addFn, ['class1', 'class2']);
        expect(addFn).toHaveBeenCalledWith('class1');
        expect(addFn).toHaveBeenCalledWith('class2');
    });
});

describe('resolveObject', () => {
    const addFn = vi.fn();

    it('should add class names for true values', () => {
        resolveObject(addFn, { class1: true, class2: false });
        expect(addFn).toHaveBeenCalledWith('class1');
        expect(addFn).not.toHaveBeenCalledWith('class2');
    });

    it('should add class names with predicates', () => {
        resolveObject(addFn, { class1: 'predicate' });
        expect(addFn).toHaveBeenCalledWith('predicate', 'class1');
    });
});