import { CodeBracketIcon, PuzzlePieceIcon, ArrowsPointingOutIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import "./App.css";
import { CodeBlock } from "./components/CodeBlock";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
      {children}
    </span>
  );
}

function Feature({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <Icon className="w-12 h-12 text-indigo-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function CodeExample() {
  const code = `import { createCascade } from 'use-cascade';
import { twMerge } from 'tailwind-merge';

const [ useCascade, CascadeProvider ] = createCascade({ out: twMerge });

function TextInput() {
  return <input type="text" className={useCascade('input px-4 py-2 rounded')} />;
}

function App() {
  return (
    <CascadeProvider className="border-2 hover:border-blue-500">
      <TextInput />
    </CascadeProvider>
  );
}`;

  return <CodeBlock code={code} language="tsx" />;
}

function CascadeExample() {
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

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-2 mb-4">
            <Badge>TypeScript</Badge>
            <Badge>React</Badge>
            <Badge>Tailwind</Badge>
            <Badge>CSS Modules</Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            use-cascade
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A better way to manipulate class names in React with support for Tailwind and CSS Modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Feature 
            icon={CodeBracketIcon}
            title="Easy to Use"
            description="No more className props. Use React context to propagate your styles."
          />
          <Feature
            icon={PuzzlePieceIcon}
            title="Flexible"
            description="Works with Tailwind CSS, CSS Modules, and any other CSS class system."
          />
          <Feature
            icon={ArrowsPointingOutIcon}
            title="Extensible"
            description="Create multiple cascades for better organization of your styles."
          />
        </div>

        <div className="space-y-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <p className="text-gray-600 mb-6">
              Create a cascade and use it in your components. No more prop drilling for styles!
            </p>
            <CodeExample />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Power of Cascade</h2>
            <p className="text-gray-600 mb-6">
              Unlike regular React context where the closest provider wins, use-cascade combines all provider values in the tree.
            </p>
            <CascadeExample />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <ChevronRightIcon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Tailwind Integration</h3>
                  <p className="text-gray-600">Use with tailwind-merge for smart class deduplication and overrides.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ChevronRightIcon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">CSS Modules Support</h3>
                  <p className="text-gray-600">Works seamlessly with CSS Modules through classnames bind approach.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ChevronRightIcon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Multiple Cascades</h3>
                  <p className="text-gray-600">Create separate cascades for different style concerns in your app.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
