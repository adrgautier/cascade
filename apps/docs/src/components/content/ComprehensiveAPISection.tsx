
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CodeBlock } from "../core/CodeBlock";
import { InlineCode } from "../core/InlineCode";
import { Section } from "../core/Section";

export function ComprehensiveAPISection() {
	const basicSignatureCode = `[
    (className: string) => string, 
    FunctionComponent<{ className: string; children: ReactNode; }>
]`;

	const optionsTypeCode = `type Options = {
    in?: (...args: any[]) => string;
    out?: (a: string) => string;
};`;

	const inFunctionBeforeCode = `import classNames from "classnames";

const [ useCascade ] = createCascade();
const className = useCascade(classNames('input', { isFocused }));`;

	const inFunctionAfterCode = `const [ useCascade ] = createCascade({ in: classNames });
const className = useCascade('input', { isFocused });`;

	const outFunctionBeforeCode = `import { twMerge } from "tailwind-merge";

const [ useCascade ] = createCascade();
const className = twMerge(useCascade('shadow-lg bg-slate-600 rounded-xl'));`;

	const outFunctionAfterCode = `const [ useCascade ] = createCascade({ out: twMerge });
const className = useCascade('shadow-lg bg-slate-600 rounded-xl');`;

	const namedElementsCode = `const [ useCascade, CascadeProvider ] = createCascade(
    'wrapper', 'title', 'description',
);

export const ArticleCascade = CascadeProvider;`;

	const namedElementsUsageCode = `<article className={useCascade.wrapper('wrapper')}>
    <h1 className={useCascade.title('title')}>Title</h1>
    <p className={useCascade.description('description')}>
        {/* description */}
    </p>
</article>`;

	const namedElementsProviderCode = `<ArticleCascade.wrapper className={'listArticle'}>
    {articles.map((item) => <Article {...item} />)}
</ArticleCascade.wrapper>`;

	const combinedCode = `const [ useCascade, CascadeProvider ] = createCascade(
    { in: classNames.bind(styles) },
    'wrapper', 'title', 'description',
);`;

	return (
		<Section>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">API Reference</h2>
			<p className="text-gray-800 dark:text-gray-200 mb-8">
				The <InlineCode>createCascade</InlineCode> function can be called in different ways to suit various use cases.
			</p>

			<div className="space-y-8">
				{/* Basic createCascade() */}
				<div className="flex items-start gap-4">
					<ChevronRightIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
							<InlineCode>createCascade()</InlineCode>
						</h3>
						<p className="text-gray-800 dark:text-gray-200 mb-4">
							Without any argument, it returns a tuple with a <em>consumer</em> function and a <em>Provider</em> component:
						</p>
						<CodeBlock code={basicSignatureCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4">
							By default, the <em>consumer</em> function only accepts a single string.
						</p>
					</div>
				</div>

				{/* createCascade(options) */}
				<div className="flex items-start gap-4">
					<ChevronRightIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
							<InlineCode>createCascade(options)</InlineCode>
						</h3>
						<p className="text-gray-800 dark:text-gray-200 mb-4">
							The <InlineCode>createCascade</InlineCode> function can also be called with an <InlineCode>options</InlineCode> object:
						</p>
						<CodeBlock code={optionsTypeCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4 mb-4">
							The <InlineCode>options</InlineCode> allows to transform the arguments and the return value of the <em>consumer</em> function.
						</p>

						<h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">The <InlineCode>in</InlineCode> function</h4>
						<p className="text-gray-800 dark:text-gray-200 mb-4">
							The <InlineCode>in</InlineCode> function allows to transform <strong>the arguments</strong> passed to the <em>consumer</em> function into a <strong>single string</strong>.
						</p>
						<p className="text-gray-800 dark:text-gray-200 mb-2">Using <InlineCode>classnames</InlineCode> lib, you can transform:</p>
						<CodeBlock code={inFunctionBeforeCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4 mb-2">Into:</p>
						<CodeBlock code={inFunctionAfterCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4">
							The <em>consumer</em> function inherits the signature of <InlineCode>in</InlineCode> function provided in the <InlineCode>options</InlineCode> object.
						</p>

						<h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">The <InlineCode>out</InlineCode> function</h4>
						<p className="text-gray-800 dark:text-gray-200 mb-4">
							The <InlineCode>out</InlineCode> function allows to transform the <strong>return value</strong> of the <em>consumer</em> function into a <strong>single string</strong>.
						</p>
						<p className="text-gray-800 dark:text-gray-200 mb-2">Using <InlineCode>tailwind-merge</InlineCode> lib, you can transform:</p>
						<CodeBlock code={outFunctionBeforeCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4 mb-2">Into:</p>
						<CodeBlock code={outFunctionAfterCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4">
							The <InlineCode>out</InlineCode> function must accept at least a string as the first argument and must return a string.
						</p>
					</div>
				</div>

				{/* createCascade(...elements) */}
				<div className="flex items-start gap-4">
					<ChevronRightIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
							<InlineCode>createCascade(...elements)</InlineCode>
						</h3>
						<p className="text-gray-800 dark:text-gray-200 mb-4">
							The <InlineCode>createCascade</InlineCode> function can be called with the list of elements in the cascade:
						</p>
						<CodeBlock code={namedElementsCode} language="ts" />
						<p className="text-gray-800 dark:text-gray-200 mt-4 mb-4">
							This creates a <em>consumer</em> function for each element:
						</p>
						<CodeBlock code={namedElementsUsageCode} language="tsx" />
						<p className="text-gray-800 dark:text-gray-200 mt-4 mb-4">
							This also creates a <em>provider</em> component for each element. This ensures targeting a specific element when providing new class to the cascade:
						</p>
						<CodeBlock code={namedElementsProviderCode} language="tsx" />
					</div>
				</div>

				{/* createCascade(options, ...elements) */}
				<div className="flex items-start gap-4">
					<ChevronRightIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
							<InlineCode>createCascade(options, ...elements)</InlineCode>
						</h3>
						<p className="text-gray-800 dark:text-gray-200 mb-4">
							The <InlineCode>createCascade</InlineCode> function can be called with both the options and the list of elements in the cascade. This combines the behaviors described in the above sections:
						</p>
						<CodeBlock code={combinedCode} language="ts" />
					</div>
				</div>
			</div>
		</Section>
	);
}
