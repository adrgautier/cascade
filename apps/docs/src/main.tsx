import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.tsx";
import "./index.css";
import "automad-prism-themes/dist/prism-tailwind-moon-blue.light-dark.css";

// biome-ignore lint/style/noNonNullAssertion: root is always defined
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<DarkModeProvider>
			<App />
		</DarkModeProvider>
	</StrictMode>,
);
