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
		<div className="flex flex-col items-center text-center p-6 bg-white/40 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all hover:bg-white/50">
			<Icon className="w-12 h-12 text-[#0035bb] mb-4" />
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
}
