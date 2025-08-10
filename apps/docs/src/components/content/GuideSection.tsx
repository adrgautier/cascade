
import { CodeBlock } from "../core/CodeBlock";
import { InlineCode } from "../core/InlineCode";
import { Section } from "../core/Section";

export function GuideSection() {
	const cssModulesBindCode = "import classNames from 'classnames/bind';\n\nconst cx = classNames.bind(styles);";

	const cssModulesUsageCode = "const [ useCascade ] = createCascade({ in: classNames.bind(styles) });";

	const cssModulesFullCode = `const [ useCascade ] = createCascade({ 
    out: (classes: string) => classNames.bind(styles)(classes.split(" ")) 
});`;

	const tailwindMergeExampleCode = `twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
// returns → 'hover:bg-dark-red p-3 bg-[#B91C1C]'`;

	const tailwindUsageCode = `const [ useCascade, CascadeProvider ] = createCascade({ out: twMerge });

export const TextInputCascade = CascadeProvider;`;

	const tailwindComponentCode = `// TextInput component
<input type="text" className={useCascade('px-2 py-1 bg-red hover:bg-dark-red')} />

// parent component
<TextInputCascade className="p-3 bg-[#B91C1C]">
    {/* ... */}
</TextInputCascade>`;

	return (
		<Section>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Usage Guide</h2>

			<div className="space-y-8">
				{/* CSS Modules */}
				<div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Using with CSS Modules</h3>
					<p className="text-gray-800 dark:text-gray-200 mb-4">
						If you already use <InlineCode>classnames</InlineCode>, you may be familiar with its "bind" approach:
					</p>
					<CodeBlock code={cssModulesBindCode} language="ts" />
					
					<p className="text-gray-800 dark:text-gray-200 mt-6 mb-4">
						This approach can be used to transform the class names provided to the <em>consumer</em> function into their hashed version:
					</p>
					<CodeBlock code={cssModulesUsageCode} language="ts" />

					<div className="mt-6 p-4 bg-amber-50 dark:bg-amber-800/40 rounded-lg border border-amber-200 dark:border-amber-600/60">
						<p className="text-amber-800 dark:text-amber-200 mb-2">
							<strong>Note:</strong> This <strong>does not</strong> transform the class names provided outside the component. To achieve this behavior you must use the <InlineCode className="bg-amber-100 dark:bg-amber-700/50 dark:text-amber-100">out</InlineCode> function. <InlineCode className="bg-amber-100 dark:bg-amber-700/50 dark:text-amber-100">classnames</InlineCode> requires to split the classes to work properly:
						</p>
						<div className="mt-3">
							<CodeBlock code={cssModulesFullCode} language="ts" />
						</div>
					</div>
				</div>

				{/* Tailwind */}
				<div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Using with Tailwind</h3>
					<p className="text-gray-800 dark:text-gray-200 mb-4">
						If you use Tailwind, you may want to deduplicate classes and override already defined rules. <InlineCode>tailwind-merge</InlineCode> is the tool for you:
					</p>
					<CodeBlock code={tailwindMergeExampleCode} language="ts" />
					
					<p className="text-gray-800 dark:text-gray-200 mt-6 mb-4">
						<InlineCode>twMerge</InlineCode> must be used as the <InlineCode>out</InlineCode> function:
					</p>
					<CodeBlock code={tailwindUsageCode} language="ts" />

					<p className="text-gray-800 dark:text-gray-200 mt-6 mb-4">
						Using the same values as the above example:
					</p>
					<CodeBlock code={tailwindComponentCode} language="tsx" />

					<p className="text-gray-800 dark:text-gray-200 mt-4">
						Under the hood, the <InlineCode>twMerge</InlineCode> helper will produce the expected class combination.
					</p>
				</div>
			</div>
		</Section>
	);
}
