import { UniqueElement } from './constants'; 

/**
 * Value of a cascade. Contains a record of className values by element
 */
export class CascadeValue {
    private value: Partial<Record<string | UniqueElement, string>>;

    constructor(extendedValue?: Partial<Record<string | UniqueElement, string>>) {
        if(extendedValue) {
            this.value = extendedValue;
            return;
        }
        this.value = {};
    }

    extend(element: string | UniqueElement, className: string): CascadeValue {
        const extendedValue = { ...this.value, [element]: this.value[element] ? `${this.value[element]} ${className}` : className };
        return new CascadeValue(extendedValue);
    }

    get(element: string | UniqueElement) {
        return this.value[element] || '';
    }
}