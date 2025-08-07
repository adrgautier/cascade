export const Section = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<section className="bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-8">
			{children}
		</section>
	);
};
