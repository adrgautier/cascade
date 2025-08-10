export const Section = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<section className="bg-primary-light/60 dark:bg-primary-dark/60 backdrop-blur-md rounded-xl border-2 border-primary p-8">
			{children}
		</section>
	);
};
