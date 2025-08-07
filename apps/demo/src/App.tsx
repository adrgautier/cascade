import {
	AdjustmentsHorizontalIcon,
	ChevronRightIcon,
	CommandLineIcon,
	CubeTransparentIcon,
} from "@heroicons/react/20/solid";
import { Badge } from "./components/Badge";
import { CodeBlock } from "./components/CodeBlock";
import { Feature } from "./components/Feature";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { InlineCode } from "./components/InlineCode";
import { IridescentBlobs } from "./components/IridescentBlobs";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main";
import { Section } from "./components/Section";
import { Separator } from "./components/Separator";
import { CSSModulesExample } from "./components/examples/CSSModulesExample";
import { CascadeExample } from "./components/examples/CascadeExample";
import { CodeExample } from "./components/examples/CodeExample";
import { TailwindExample } from "./components/examples/TailwindExample";

function App() {
	return (
		<>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<IridescentBlobs className="w-full h-full opacity-30" />
			</div>
			<Header>
				<div className="flex flex-wrap justify-center gap-2 mb-4">
					<Badge>For React</Badge>
					<Badge>Written in TypeScript</Badge>
					<Badge>Tailwind compatible</Badge>
					<Badge>CSS Modules compatible</Badge>
				</div>
				<div className="flex py-8 justify-center">
					<Logo />
				</div>
				<p className="text-xl text-gray-600 max-w-xl mx-auto text-center">
					A better way to manipulate class names in React with support for
					Tailwind and CSS Modules.
				</p>
			</Header>
			<Separator backgroundColor="#fff" height={200} />
			<Main>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					<Feature
						icon={AdjustmentsHorizontalIcon}
						title="Flexible Integration"
						description="Works seamlessly with Tailwind, CSS Modules, and classnames."
					/>
					<Feature
						icon={CubeTransparentIcon}
						title="Cascading Context"
						description="Simulate the CSS cascading behavior using React context."
					/>
					<Feature
						icon={CommandLineIcon}
						title="Simple API"
						description="Create the Provider and the consumer using a single line of code."
					/>
				</div>

				<div className="space-y-16">
					<Section>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">API</h2>
						<p className="mb-4">
							The <InlineCode>createCascade</InlineCode> function can be called
							in different ways.{" "}
						</p>
						<div className="space-y-4">
							<div className="flex items-start gap-4">
								<ChevronRightIcon className="w-6 h-6 text-[#0035bb] flex-shrink-0 mt-1" />
								<div className="overflow-auto">
									<h3 className="font-semibold text-gray-900">
										<InlineCode>createCascade()</InlineCode>
									</h3>
									<p className="text-gray-600">
										Without any argument, it returns a tuple with a{" "}
										<em>consumer</em> function and a <em>Provider</em>{" "}
										component:
									</p>
									<CodeBlock
										code={`[
    (className: string) => string, 
    FunctionComponent<{ className: string; children: ReactNode; }>
]`}
									/>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<ChevronRightIcon className="w-6 h-6 text-[#0035bb] flex-shrink-0 mt-1" />
								<div>
									<h3 className="font-semibold text-gray-900">
										Multiple Cascades
									</h3>
									<p className="text-gray-600">
										Create separate cascades for different style concerns, each
										with its own priority system.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<ChevronRightIcon className="w-6 h-6 text-[#0035bb] flex-shrink-0 mt-1" />
								<div>
									<h3 className="font-semibold text-gray-900">
										Named Elements
									</h3>
									<p className="text-gray-600">
										Create cascades with named elements for better organization
										and targeting specific parts of your components.
									</p>
								</div>
							</div>
						</div>
					</Section>
					<Section>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Why use-cascade?
						</h2>
						<p className="text-gray-600 mb-6">
							Say goodbye to className prop drilling! No more creating new props
							just to provide additional classes from parent components.
						</p>
						<CodeExample />
					</Section>

					<Section>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							The Power of Cascade
						</h2>
						<p className="text-gray-600 mb-6">
							Unlike regular React context where the closest provider wins,
							use-cascade combines all provider values in the tree. More
							specific providers have higher priority.
						</p>
						<CascadeExample />
					</Section>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Section>
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								Tailwind Integration
							</h2>
							<p className="text-gray-600 mb-6">
								Perfect integration with tailwind-merge for smart class
								deduplication and proper specificity handling.
							</p>
							<TailwindExample />
						</Section>

						<Section>
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								CSS Modules Support
							</h2>
							<p className="text-gray-600 mb-6">
								Full CSS Modules support with classnames bind approach for both
								local and provided classes.
							</p>
							<CSSModulesExample />
						</Section>
					</div>
				</div>
			</Main>
			<Separator backgroundColor="#0035bb" direction="end" height={150} />
			<Footer>
				<p className="text-white">
					&copy; {new Date().getFullYear()} use-cascade. All rights reserved.
				</p>
				<p className="text-white mt-2">Created with ❤️ by Adrien Gautier.</p>
			</Footer>
		</>
	);
}

export default App;
