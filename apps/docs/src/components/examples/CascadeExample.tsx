
import { CodeBlock } from "../core/CodeBlock";

export function CascadeExample() {
	const code = `// TextInput.tsx
export function TextInput() {
    return <input type="text" className={useCascade('input')} />
}
export const TextInputCascade = CascadeProvider;

// InputField.tsx
function InputField() {
    return (<TextInputCascade className="fieldInput">
        <TextInput />
    </TextInputCascade>);
}

// Form.tsx
function Form() {
    return (<TextInputCascade className="formInput">
        <InputField />
    </TextInputCascade>);
}

// Result: className="input formInput fieldInput"`;

	return <CodeBlock code={code} language="tsx" />;
}
