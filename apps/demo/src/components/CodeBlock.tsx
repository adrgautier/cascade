import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

interface CodeBlockProps {
	code: string;
	language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: need to refresh prism on code change
	useEffect(() => {
		Prism.highlightAll();
	}, [code]);

	return (
		<pre className="bg-gray-900 rounded-xl p-6 overflow-x-auto relative flex">
			<code className={`text-sm language-${language}`}>{code}</code>
		</pre>
	);
}
