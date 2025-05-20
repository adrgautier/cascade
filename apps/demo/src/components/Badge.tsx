import React from 'react';

export function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-[#0035bb]/10 text-[#0035bb]">
			{children}
		</span>
	);
}
