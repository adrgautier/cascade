
import { CodeBlock } from "../core/CodeBlock";
import { Section } from "../core/Section";

export function InstallationSection() {
	const npmCode = "npm install use-cascade";
	const yarnCode = "yarn add use-cascade";
	const pnpmCode = "pnpm add use-cascade";

	return (
		<Section>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Installation</h2>
			<p className="text-gray-800 dark:text-gray-200 mb-6">
				Install use-cascade using your preferred package manager:
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">npm</h5>
					<CodeBlock code={npmCode} language="bash" />
				</div>
				<div>
					<h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">yarn</h5>
					<CodeBlock code={yarnCode} language="bash" />
				</div>
				<div>
					<h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">pnpm</h5>
					<CodeBlock code={pnpmCode} language="bash" />
				</div>
			</div>
		</Section>
	);
}
