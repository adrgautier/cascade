import type React from "react";

export function Feature({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col items-center text-center p-6 bg-primary-light/60 dark:bg-primary-dark/60 backdrop-blur-md rounded-xl border-2 border-primary">
			<Icon className="w-12 h-12 text-primary mb-4" />
			<h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
			<p className="text-gray-600 dark:text-gray-200">{description}</p>
		</div>
	);
}
