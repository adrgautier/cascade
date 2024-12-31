const SPACE = /\s+/; 

export function splitClassName(className: string): string[] {
    return className.split(SPACE);
}