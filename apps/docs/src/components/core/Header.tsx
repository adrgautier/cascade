export const Header = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<header className="relative px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900">
		<div className="max-w-screen-lg mx-auto">{children}</div>
	</header>
);
