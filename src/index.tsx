import React, {
    createContext,
    CSSProperties,
    ReactNode,
    useContext,
    useRef,
} from "react";

class CustomProperties {
    public properties: CSSProperties;

    constructor(arg: CSSProperties) {
        this.properties = arg;
    }

}

function isNotCustomProperties<TArg extends CascadeClassNameValue | CascadeKey>(arg: TArg | CustomProperties): arg is TArg {
    return !(arg instanceof CustomProperties);
}

function isCustomProperties(arg: CascadeClassNameValue | CascadeKey | CustomProperties): arg is CustomProperties {
    return arg instanceof CustomProperties;
}

function isNotCascadeKey<TArg extends CascadeClassNameValue>(arg: TArg | CascadeKey): arg is TArg {
    return typeof arg !== "symbol";
}

type CascadeKey = string | symbol;

type CascadeClassNameValue = CascadeClassNameArray | string | null | undefined | 0 | false;
type CascadeClassNameMinimumRequirementValue = string; // simplest type to be supported by the merge function
type CascadeClassNameArray = CascadeClassNameValue[];


type CascadeContextClassNames = Record<CascadeKey, string>;
type CascadeContextStyles = Record<CascadeKey, CSSProperties>;
type CascadeContextValues = {
    classNames?: CascadeContextClassNames;
    styles?: CascadeContextStyles;
};


const CascadeContext = createContext<CascadeContextValues>({});

export const computeAdditionalClassNameArguments = (
    args: (CascadeClassNameValue | CascadeKey)[],
    classNames: CascadeContextClassNames
): string[] => {
    return args
        .reduce((acc: string[], arg) => {
            if (typeof arg === "symbol") {
                return Object.getOwnPropertySymbols(classNames).reduce((acc, key) => {
                    if (arg === key) {
                        return [...acc, classNames[key]];
                    }
                    return acc;
                }, acc);
            }
            if (typeof arg === "string") {
                return Object.keys(classNames).reduce((acc, key) => {
                    if (arg.includes(key)) {
                        return [...acc, classNames[key]];
                    }
                    return acc;
                }, acc);
            }
            if (Array.isArray(arg)) {
                return computeAdditionalClassNameArguments(arg, classNames);
            }
            return acc;
        }, [] as string[])
        .flat();
};

export const computeInheritedParentStyle = (
    className: (CascadeClassNameValue | CascadeKey)[],
    parentStyles: CascadeContextStyles
): CSSProperties => {
    return className.reduce((acc: CSSProperties, arg) => {
        if (typeof arg === "string") {
            return Object.keys(parentStyles).reduce((acc, key) => {
                if (arg.includes(key)) {
                    return {...acc, ...parentStyles[key]};
                }
                return acc;
            }, acc);
        }
        if (Array.isArray(arg)) {
            return computeInheritedParentStyle(arg, parentStyles);
        }
        return acc;
    }, {} as CSSProperties);
};

const defaultMergeFunction = (...args: CascadeClassNameMinimumRequirementValue[]): string => args.join(' ');

const defaultMergeFunctionFactory = () => defaultMergeFunction;

export const useCascadeFactory = <TMergeFunctionFactoryArgs extends unknown[], TMergeFunctionArg extends CascadeClassNameValue>(mergeFunctionFactory: (...args: TMergeFunctionFactoryArgs) => (...args: (TMergeFunctionArg | CascadeClassNameMinimumRequirementValue)[]) => string) => {

    return function useCascade(...args: TMergeFunctionFactoryArgs) {
        const cs = useRef(mergeFunctionFactory(...args));
        const {classNames: parentClassNames, styles: parentStyles} =
            useContext(CascadeContext);

        const compute = (...args: (TMergeFunctionArg | CascadeClassNameMinimumRequirementValue | CascadeKey | CustomProperties)[]) => {
            const classNameOrKeyArgs = args.filter(isNotCustomProperties);
            const customPropertiesArgs = args.filter(isCustomProperties);

            const style = customPropertiesArgs.reduce((acc, customPropertiesArg) => ({
                ...acc,
                ...customPropertiesArg.properties
            }), {} as CSSProperties)

            const additionalClassNames = parentClassNames
                ? computeAdditionalClassNameArguments(
                    classNameOrKeyArgs,
                    parentClassNames
                )
                : [];

            const inheritedParentStyle = parentStyles
                ? computeInheritedParentStyle(classNameOrKeyArgs, parentStyles)
                : {};

            const classNameArgs = classNameOrKeyArgs.filter(isNotCascadeKey);

            return {
                className: cs.current(...classNameArgs, ...additionalClassNames),
                style: {...style, ...inheritedParentStyle},
            };
        };

        compute.var = function (customProperties: CSSProperties) {
            return new CustomProperties(customProperties);
        }

        return compute;
    };
}

export const cascadeClassNames = (
    on: CascadeKey,
    parent?: CascadeContextClassNames,
    current?: string
): CascadeContextClassNames | undefined => {
    if (!parent && !current) {
        return undefined;
    }
    if (!parent) {
        return {
            [on]: current!,
        };
    }
    if (!current) {
        return parent;
    }
    const keys = new Set<CascadeKey>();
    keys.add(on);
    Object.keys(parent).forEach((p) => keys.add(p));
    Object.getOwnPropertySymbols(parent).forEach((p) => keys.add(p));
    return Array.from(keys).reduce((acc, key) => {
        const parentArgument = parent[key];
        if (key !== on && !parent[key]) {
            return acc;
        }
        if (key !== on) {
            return {
                ...acc,
                [key]: parentArgument,
            };
        }
        if (!parentArgument) {
            return {
                ...acc,
                [key]: current,
            };
        }
        return {
            ...acc,
            [key]: `${parentArgument} ${current}`,
        };

    }, {} as CascadeContextClassNames);
};

export const cascadeStyles = (
    on: CascadeKey,
    parent?: CascadeContextStyles,
    current?: CSSProperties
): CascadeContextStyles | undefined => {
    if (!parent && !current) {
        return undefined;
    }
    if (!parent) {
        return {
            [on]: current!,
        };
    }
    if (!current) {
        return parent;
    }
    const keys = new Set<CascadeKey>();
    keys.add(on);
    Object.keys(parent).forEach(keys.add);
    Object.getOwnPropertySymbols(parent).forEach((p) => keys.add(p));
    return Array.from(keys).reduce((acc, key) => {
        const parentStyle = parent[key] || {};
        const currentStyle = key === on ? current : {};
        return {
            ...acc,
            [key]: {...currentStyle, ...parentStyle},
        };
    }, {} as CascadeContextStyles);
};

type CascadeProps = ({ on: CascadeKey; className?: string; style?: CSSProperties; } | { reset: true }) & {
    children: ReactNode;
};

export const Cascade = ({children, ...props}: CascadeProps) => {
    if ("reset" in props) {
        return (
            <CascadeContext.Provider
                value={{classNames: undefined, styles: undefined}}
            >
                {children}
            </CascadeContext.Provider>
        );
    }

    const {on, className, style} = props;
    const {classNames: parentClassNames, styles: parentStyles} =
        useContext(CascadeContext);

    const cascadedClassNames = cascadeClassNames(on, parentClassNames, className);
    const cascadedStyles = cascadeStyles(on, parentStyles, style);

    return (
        <CascadeContext.Provider
            value={{classNames: cascadedClassNames, styles: cascadedStyles}}
        >
            {children}
        </CascadeContext.Provider>
    );
};
