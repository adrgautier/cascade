import type React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary/10 dark:bg-primary/50 text-primary dark:text-primary-light/70">
			{children}
		</span>
	);
}
