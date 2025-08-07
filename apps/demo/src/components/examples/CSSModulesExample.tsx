import React from "react";
import { CodeBlock } from "../CodeBlock";

export function CSSModulesExample() {
	const code = `import classNames from 'classnames/bind';

const [ useCascade ] = createCascade({ 
    in: classNames.bind(styles),
    out: (classes) => classNames.bind(styles)(classes.split(" "))
});

// Now supports both local and provided classes
function Component() {
    return <div className={useCascade('localClass')} />;
}`;

	return <CodeBlock code={code} language="tsx" />;
}
