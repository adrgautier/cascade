/**
 * Value of a cascade. Contains:
 * - a common className value
 * - a record of className values by predicate
 */
export class CascadeValue {
    common: string;
    match: Record<string, string>;

    constructor(cascadeValue?: CascadeValue) {
        this.common = cascadeValue?.common || "";
        this.match = { ...cascadeValue?.match };
    }

    addCommon(className: string) {
        this.common = this.common ? `${this.common} ${className}`: className;
    }

    addMatch(className: string, predicate: string) {
        this.match[predicate] = this.match[predicate] ? `${this.match[predicate]} ${className}` : className;
    }
}