import {
	PuzzlePieceIcon,
	SparklesIcon,
	Square3Stack3DIcon,
} from "@heroicons/react/20/solid";
// Core components (UI components without content)
import { Badge } from "./components/core/Badge";
import { DarkModeToggle } from "./components/core/DarkModeToggle";

import { Feature } from "./components/core/Feature";
import { Footer } from "./components/core/Footer";
import { Header } from "./components/core/Header";
import { Logo } from "./components/core/Logo";
import { Main } from "./components/core/Main";
import { Section } from "./components/core/Section";
import { Separator, SeparatorCascade } from "./components/core/Separator";
// Example components
import { CSSModulesExample } from "./components/examples/CSSModulesExample";
import { TailwindExample } from "./components/examples/TailwindExample";
// Content components (sections with text content)
import { InstallationSection } from "./components/content/InstallationSection";
import { MotivationSection } from "./components/content/MotivationSection";
import { QuickExampleSection } from "./components/content/QuickExampleSection";
import { ProvidersCascadeSection } from "./components/content/ProvidersCascadeSection";
import { ComprehensiveAPISection } from "./components/content/ComprehensiveAPISection";
import { GuideSection } from "./components/content/GuideSection";

function App() {
	return (
		<>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* TODO: add abstract shapes */}
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
				<h1 className="sr-only">use-cascade - A better way to manipulate class names in React</h1>
				<p className="text-xl text-gray-800 dark:text-gray-200 max-w-xl mx-auto text-center mb-12">
					A better way to manipulate class names in React with support for
					Tailwind and CSS Modules.
				</p>
				
				{/* Installation Section in Header */}
				<InstallationSection />

				{/* Features Section in Header */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
					<Feature
						icon={PuzzlePieceIcon}
						title="Flexible Integration"
						description="Works seamlessly with Tailwind, CSS Modules, and classnames."
					/>
					<Feature
						icon={Square3Stack3DIcon}
						title="Cascading Context"
						description="Simulate the CSS cascading behavior using React context."
					/>
					<Feature
						icon={SparklesIcon}
						title="Preserved Autocompletion"
						description="Simple syntax ensures IntelliSense support and editor suggestions."
					/>
				</div>

				{/* Integration Examples in Header */}
				<div className="space-y-8">
					<Section>
						<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
							Tailwind Integration
						</h3>
						<p className="text-gray-800 dark:text-gray-200 mb-6">
							Perfect integration with tailwind-merge for smart class
							deduplication and proper specificity handling.
						</p>
						<TailwindExample />
					</Section>

					<Section>
						<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
							CSS Modules Support
						</h3>
						<p className="text-gray-800 dark:text-gray-200 mb-6">
							Full CSS Modules support with classnames bind approach for both
							local and provided classes.
						</p>
						<CSSModulesExample />
					</Section>
				</div>
			</Header>
			<SeparatorCascade className="bg-white dark:bg-gray-900">
				<Separator direction="start" height={200} />
			</SeparatorCascade>
			<Main>
				<div className="space-y-16">
					<MotivationSection />
					<QuickExampleSection />
					<ProvidersCascadeSection />
					<ComprehensiveAPISection />
					<GuideSection />
				</div>
			</Main>
			<SeparatorCascade className="bg-primary">
				<Separator direction="end" height={150} />
			</SeparatorCascade>
			<Footer>
				<p className="text-white">Made with 🧠 by Adrien Gautier.</p>
			</Footer>
			<DarkModeToggle />
		</>
	);
}

export default App;
