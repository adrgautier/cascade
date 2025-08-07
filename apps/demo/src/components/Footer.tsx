export const Footer = ({ children }: { children: React.ReactNode }) => {
	return (
		<footer className="bg-[#0035bb] pb-8 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{children}
			</div>
		</footer>
	);
};
