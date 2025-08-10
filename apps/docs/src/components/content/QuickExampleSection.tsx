
import { CodeBlock } from "../core/CodeBlock";
import { InlineCode } from "../core/InlineCode";
import { Section } from "../core/Section";

export function QuickExampleSection() {
	const setupCode = `import { createCascade } from 'use-cascade';

const [ useCascade, CascadeProvider ] = createCascade();`;

	const consumerCode = `export function TextInput() {
    return <input type="text" className={useCascade('input')} />
}`;

	const providerCode = "export const TextInputCascade = CascadeProvider;";

	const usageCode = `import { TextInput, TextInputCascade } from './TextInput';

function InputField() {
    return (<TextInputCascade className="fieldInput">
        <TextInput />
    </TextInputCascade>);
}`;

	return (
		<Section>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Example</h2>
			<p className="text-gray-800 dark:text-gray-200 mb-6">
				The <InlineCode>createCascade</InlineCode> function returns a tuple with a{" "}
				<em>consumer</em> function and a <em>Provider</em> component.
			</p>
			<CodeBlock code={setupCode} language="ts" />
			
			<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
				The <em>consumer</em> function
			</h3>
			<p className="text-gray-800 dark:text-gray-200 mb-4">
				The <em>consumer</em> function <strong>combines</strong> the class names passed as{" "}
				<strong>direct arguments</strong> with the class names provided in{" "}
				<strong>the context</strong>.
			</p>
			<p className="text-gray-800 dark:text-gray-200 mb-4">
				The direct arguments can be used to give the "base" style to your element:
			</p>
			<CodeBlock code={consumerCode} language="tsx" />

			<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
				The <em>Provider</em> component
			</h3>
			<p className="text-gray-800 dark:text-gray-200 mb-4">
				The <em>Provider</em> component is a context provider that will provide the class names to its children.
			</p>
			<p className="text-gray-800 dark:text-gray-200 mb-4">
				First we need to export the <em>Provider</em> component from the file:
			</p>
			<CodeBlock code={providerCode} language="tsx" />

			<p className="text-gray-800 dark:text-gray-200 mb-4 mt-6">
				Then we can use it in our component tree, to provide new class names to the cascade:
			</p>
			<CodeBlock code={usageCode} language="tsx" />

			<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-800/40 rounded-lg border border-blue-200 dark:border-blue-600/60">
				<p className="text-blue-800 dark:text-blue-200">
					<strong>Result:</strong> In this example, the input element will receive, as className prop the value{" "}
					<InlineCode className="bg-blue-100 dark:bg-blue-700/50 dark:text-blue-100">"input fieldInput"</InlineCode>.
				</p>
			</div>
		</Section>
	);
}
