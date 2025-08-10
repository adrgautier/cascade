export const InlineCode = ({
	children,
	className = "bg-gray-100",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<code className={`${className} text-gray-900 px-[.4em] py-[.2em] rounded-md font-mono`}>
		{children}
	</code>
);
