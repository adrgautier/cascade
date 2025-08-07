export const InlineCode = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<code className="bg-gray-100  text-gray-900  px-2 py-1 rounded-md font-mono">
		{children}
	</code>
);
