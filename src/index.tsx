import React, {
    createContext,
    CSSProperties,
    ReactNode,
    useContext,
    useRef,
} from "react";

type CascadeClassNameValue = CascadeClassNameArray | string | null | undefined | 0 | false;
type CascadeClassNameArray = CascadeClassNameValue[];
type CascadeClassNameArguments = [...CascadeClassNameArray, CascadeClassNameValue | CSSProperties];

type CascadeContextClassNames = Record<string, string>;
type CascadeContextStyles = Record<string, CSSProperties>;
type CascadeContextValues = {
    classNames?: CascadeContextClassNames;
    styles?: CascadeContextStyles;
};

const CascadeContext = createContext<CascadeContextValues>({});

export const computeAdditionalClassNameArguments = (
    args: CascadeClassNameArray,
    classNames: CascadeContextClassNames
): CascadeClassNameArray => {
    return args
        .reduce((acc: CascadeClassNameArray, arg) => {
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
        }, [] as CascadeClassNameArray)
        .flat();
};

export const computeInheritedParentStyle = (
    className: CascadeClassNameArray,
    parentStyles: CascadeContextStyles
): CSSProperties => {
    return className.reduce((acc: CSSProperties, arg) => {
        if (typeof arg === "string") {
            return Object.keys(parentStyles).reduce((acc, key) => {
                if (arg.includes(key)) {
                    return { ...acc, ...parentStyles[key] };
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


type MergeFunction = (...args: CascadeClassNameArray) => string;

const isCascadeClassNameValue = (arg: CSSProperties | CascadeClassNameValue): arg is CascadeClassNameValue => typeof arg !== "object" || Array.isArray(arg)

export const useCascadeFactory = <TMergeFunctionFactoryArgs extends unknown[], TMergeFunction extends MergeFunction>(mergeFunctionFactory: (...args: TMergeFunctionFactoryArgs) => TMergeFunction) => {

    return function useCascade (...args: TMergeFunctionFactoryArgs)  {
        const cs = useRef(mergeFunctionFactory(...args));
        const { classNames: parentClassNames, styles: parentStyles } =
            useContext(CascadeContext);

        const compute = (...args: CascadeClassNameArguments) => {
            const classNameArgs = args.filter(isCascadeClassNameValue);
            let style: CSSProperties = {};

            if(args.length > classNameArgs.length) {
                style = args[args.length - 1] as CSSProperties || {};
            }

            const additionalArgs = parentClassNames
                ? computeAdditionalClassNameArguments(
                    classNameArgs,
                    parentClassNames
                )
                : [];

            const inheritedParentStyle = parentStyles
                ? computeInheritedParentStyle(classNameArgs, parentStyles)
                : {};

            return {
                className: cs.current(...classNameArgs, ...additionalArgs),
                style: { ...style, ...inheritedParentStyle },
            };
        };

        return compute;
    };
}

type CascadeProps = ({ on: string; className?: string; style?: CSSProperties;} | { reset: true }) & {
    children: ReactNode;
};

export const cascadeClassNames = (
    on: string,
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
    const keys = new Set<string>();
    keys.add(on);
    Object.keys(parent).forEach((p) => keys.add(p));
    return Array.from(keys).reduce((acc, key) => {
        const parentArgument = parent[key];
        if(key !== on && !parent[key]) {
            return acc;
        }
        if(key !== on) {
            return {
                ...acc,
                [key]: parentArgument,
            };
        }
        if(!parentArgument) {
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
    on: string,
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
    const keys = new Set<string>();
    keys.add(on);
    Object.keys(parent).forEach(keys.add);
    return Array.from(keys).reduce((acc, key) => {
        const parentStyle = parent[key] || {};
        const currentStyle = key === on ? current : {};
        return {
            ...acc,
            [key]: { ...currentStyle, ...parentStyle },
        };
    }, {} as CascadeContextStyles);
};

export const Cascade = ({ children, ...props }: CascadeProps) => {
    if ("reset" in props) {
        return (
            <CascadeContext.Provider
                value={{ classNames: undefined, styles: undefined }}
    >
        {children}
        </CascadeContext.Provider>
    );
    }

    const { on, className, style } = props;
    const { classNames: parentClassNames, styles: parentStyles } =
        useContext(CascadeContext);

    const cascadedClassNames = cascadeClassNames(on, parentClassNames, className);
    const cascadedStyles = cascadeStyles(on, parentStyles, style);

    return (
        <CascadeContext.Provider
            value={{ classNames: cascadedClassNames, styles: cascadedStyles }}
>
    {children}
    </CascadeContext.Provider>
);
};
