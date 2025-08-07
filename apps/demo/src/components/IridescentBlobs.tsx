interface IridescentBlobsProps {
	className?: string;
}

export function IridescentBlobs({ className = "" }: IridescentBlobsProps) {
	return (
		<div className={`${className} fixed`}>
			<div className="absolute top-2/4 left-1/4 w-256 h-256 bg-gradient-to-r from-pink-400 to-purple-200 rounded-full mix-blend-screen filter" />
			<div className="absolute top-2/3 right-1/3 w-288 h-288 bg-gradient-to-r from-yellow-400 to-pink-200 rounded-full mix-blend-screen filter opacity-70" />
			<div className="absolute bottom-2/4 right-1/4 w-320 h-320 bg-gradient-to-r from-blue-400 to-cyan-200 rounded-full mix-blend-screen filter opacity-70" />
			<div className="absolute bottom-2/3 left-1/3 w-384 h-384 bg-gradient-to-r from-purple-400 to-blue-200 rounded-full mix-blend-screen filter opacity-70" />
		</div>
	);
}
