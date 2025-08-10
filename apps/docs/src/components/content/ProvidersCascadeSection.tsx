
import { CodeBlock } from "../core/CodeBlock";
import { InlineCode } from "../core/InlineCode";
import { Section } from "../core/Section";

export function ProvidersCascadeSection() {
	const reactContextCode = `function App() {
    return <Provider value="ignored value">
        <Provider value="consumed value">
            <Consumer />
        </Provider>
    </Provider>
}`;

	const cascadeCode = `import { TextInputCascade } from './TextInput';
import { InputField } from './InputField';

function Form() {
    return (<TextInputCascade className="formInput">
        <InputField />
    </TextInputCascade>);
}`;

	const priorityExampleCode = `const [ useCascade, CascadeProvider ] = createCascade();

export const InputFieldCascade = CascadeProvider;

function InputField() {
    return (<TextInputCascade className={useCascade(/*...*/)}>
        <TextInput />
    </TextInputCascade>); 
}`;

	return (
		<Section>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">The Providers <em>Cascade</em></h2>
			
			<p className="text-gray-800 dark:text-gray-200 mb-4">
				In React, the context provider <strong>the closest</strong> to the consumer will override the other providers above in the components tree.
			</p>
			<CodeBlock code={reactContextCode} language="tsx" />

			<p className="text-gray-800 dark:text-gray-200 mb-6 mt-6">
				In <InlineCode>use-cascade</InlineCode> however, providers are "cascading". Every class names provided in the tree will be received by the consumer. Using the previous <InlineCode>InputField</InlineCode> example, we can add another provider to the component tree:
			</p>
			<CodeBlock code={cascadeCode} language="tsx" />

			<div className="mt-6 p-4 bg-green-50 dark:bg-green-800/40 rounded-lg border border-green-200 dark:border-green-600/60">
				<p className="text-green-800 dark:text-green-200">
					<strong>Result:</strong> In this example, the input element will receive, as className prop the value{" "}
					<InlineCode className="bg-green-100 dark:bg-green-700/50 dark:text-green-100">"input formInput fieldInput"</InlineCode>.
				</p>
			</div>

			<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
				<em>Providers</em> Priority
			</h3>
			
			<div className="p-4 bg-yellow-50 dark:bg-yellow-800/40 rounded-lg border border-yellow-200 dark:border-yellow-600/60 mb-6">
				<p className="text-yellow-800 dark:text-yellow-200">
					<strong>Note:</strong> Class names order is only relevant using tools like{" "}
					<InlineCode className="bg-yellow-100 dark:bg-yellow-700/50 dark:text-yellow-100">tailwind-merge</InlineCode>. In{" "}
					<InlineCode className="bg-yellow-100 dark:bg-yellow-700/50 dark:text-yellow-100">tailwind-merge</InlineCode> the first class names have{" "}
					<strong>less priority</strong> than the last ones.
				</p>
			</div>

			<p className="text-gray-800 dark:text-gray-200 mb-4">
				The <InlineCode>consumerFunction</InlineCode> returns the class names passed as{" "}
				<strong>direct arguments</strong> first, then the class names provided in the cascade starting from the top of the tree. That means, the more "specific" is a provider, the more priority will have the provided class names.
			</p>

			<p className="text-gray-800 dark:text-gray-200 mb-4">
				If that logic does not suite your use case, you may want to create a new cascade:
			</p>
			<CodeBlock code={priorityExampleCode} language="tsx" />

			<p className="text-gray-800 dark:text-gray-200 mt-4">
				In this case, the <InlineCode>InputFieldCascade</InlineCode> provider will have the priority over <InlineCode>TextInputCascade</InlineCode>.
			</p>
		</Section>
	);
}
