
import { CodeBlock } from "../core/CodeBlock";
import { InlineCode } from "../core/InlineCode";
import { Section } from "../core/Section";

export function MotivationSection() {
	const problemCode = `const TextInput = ({ className, ...props }) => {
    return <input type="text" className={classNames('input', className)}>;
}`;

	return (
		<Section>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Motivation</h2>
			<p className="text-gray-800 dark:text-gray-200 mb-6">
				<InlineCode>classNames</InlineCode> is a great tool to manipulate classes in React. 
				However, every time I use <strong>classNames</strong>, I need to create a new prop 
				to provide additional classes from a parent component:
			</p>
			<CodeBlock code={problemCode} language="jsx" />
			<p className="text-gray-800 dark:text-gray-200 mt-6">
				<InlineCode>use-cascade</InlineCode> intends to remove className props by using 
				the context instead.
			</p>
		</Section>
	);
}
