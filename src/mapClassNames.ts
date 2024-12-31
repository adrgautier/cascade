import { splitClassName } from "./splitClassName";

export const mapClassNames = (classNamesMap: Record<string, string>) => (classNameString: string) => {
    const classNames = splitClassName(classNameString);
    return classNames.map((className) => {
        return classNamesMap[className] || className;
    }).join(" ");
}