export const Main = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-screen-lg mx-auto">
                {children}
        </div>
            </main>
    );
}