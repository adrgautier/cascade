import React from 'react';
import { renderHook } from "@testing-library/react";
import classNames from "classnames";
import { computeAdditionalClassNameArguments, Cascade, useCascadeFactory } from '../';

describe('computeAdditionalClassNameArguments', () => {
    test('should compute additional arguments properly', () => {
        const args = ['base other', true && 'state'];
        const map = { base: 'added1', state: 'added2'};

        expect(computeAdditionalClassNameArguments(args, map)).toEqual(['added1', 'added2']);
    });

    test('should compute additional arguments properly', () => {
        const args = ['base other', (false && 'state') as false];
        const map = { base: 'added1', state: 'added2'};

        expect(computeAdditionalClassNameArguments(args, map)).toEqual(['added1']);
    });
});

describe('useCascade', () => {
    test('provided classnames should add', () => {
        const { result } = renderHook(() => useCascadeFactory(() => classNames)(), {
            wrapper: ({ children }: any) => <Cascade on="base" className="added1">
            <Cascade on="state" className="added2">
            {children}
            </Cascade>
            </Cascade>
        });

        expect(result.current('base').className).toBe('base added1');
        expect(result.current(false && 'state').className).toBe('');
        expect(result.current(true && 'state').className).toBe('state added2');
    });
})