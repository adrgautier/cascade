import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../../contexts/DarkModeContext";

export function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<button
			type="button"
			onClick={toggleDarkMode}
			className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-900 border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDarkMode ? (
				<SunIcon className="w-6 h-6 text-primary" />
			) : (
				<MoonIcon className="w-6 h-6 text-primary" />
			)}
		</button>
	);
}
