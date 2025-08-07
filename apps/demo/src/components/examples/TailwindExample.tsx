import React from "react";
import { CodeBlock } from "../CodeBlock";

export function TailwindExample() {
	const code = `import { twMerge } from 'tailwind-merge';

const [ useCascade, CascadeProvider ] = createCascade({ 
    out: twMerge 
});

// TextInput component
<input type="text" className={useCascade('px-2 py-1 bg-red hover:bg-dark-red')} />

// Parent component
<TextInputCascade className="p-3 bg-[#B91C1C]">
    <TextInput />
</TextInputCascade>

// Result: hover:bg-dark-red p-3 bg-[#B91C1C]`;

	return <CodeBlock code={code} language="tsx" />;
}
