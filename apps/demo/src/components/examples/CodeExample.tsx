import React from "react";
import { CodeBlock } from "../CodeBlock";

export function CodeExample() {
	const code = `// No more className props drilling!
const TextInput = ({ className, ...props }) => {
    // Before: Using classNames 😩
    return <input type="text" className={classNames('input', className)}>; 
}

// After: Using use-cascade 🎉
const [ useCascade, CascadeProvider ] = createCascade();

function TextInput() {
    return <input type="text" className={useCascade('input px-4 py-2 rounded')} />;
}

function App() {
    return (
        <CascadeProvider className="border-2 hover:border-[#0035bb]">
            <TextInput />
        </CascadeProvider>
    );
}`;

	return <CodeBlock code={code} language="tsx" />;
}
