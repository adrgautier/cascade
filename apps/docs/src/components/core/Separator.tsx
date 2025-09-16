import { useEffect, useState, useMemo } from "react";
import { createCascade } from "use-cascade";

const [useCascade, CascadeProvider] = createCascade();

export const SeparatorCascade = CascadeProvider;

const isChromium = (): boolean => {
	if (typeof window === "undefined") return false;
	
	const userAgent = window.navigator.userAgent;
	const isChrome = userAgent.includes("Chrome");
	const isEdge = userAgent.includes("Edg");
	const isBrave = userAgent.includes("Brave");
	const isOpera = userAgent.includes("OPR") || userAgent.includes("Opera");
	
	// Chromium-based browsers include Chrome, Edge, Brave, Opera, etc.
	return isChrome || isEdge || isBrave || isOpera;
};

const createMaskSVG = (direction: string, dpr = 1, useChromiumDpr = false): string => {
	const gradientDirection =
		direction === "start"
			? { x1: "0", y1: "0", x2: "0", y2: "1" }
			: { x1: "0", y1: "1", x2: "0", y2: "0" };

	const svgContent = `
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
			<defs>
				<linearGradient id="gradient-${direction}" x1="${gradientDirection.x1}" y1="${gradientDirection.y1}" x2="${gradientDirection.x2}" y2="${gradientDirection.y2}">
					<stop offset="0%" stop-color="#fff" />
					<stop offset="15%" stop-color="#fafafa" />
					<stop offset="25%" stop-color="#f0f0f0" />
					<stop offset="35%" stop-color="#dedede" />
					<stop offset="45%" stop-color="#bebebe" />
					<stop offset="55%" stop-color="#8e8e8e" />
					<stop offset="65%" stop-color="#595959" />
					<stop offset="75%" stop-color="#2b2b2b" />
					<stop offset="85%" stop-color="#0f0f0f" />
					<stop offset="92%" stop-color="#050505" />
					<stop offset="100%" stop-color="#000" stop-opacity="0" />
				</linearGradient>
				<filter id="noise-filter">
					<feFlood flood-color="#000" flood-opacity="1" result="flood" />
					<feTurbulence
						type="fractalNoise"
						baseFrequency="${useChromiumDpr ? 0.5 : 0.5 * dpr}"
						numOctaves="5"
						seed="1"
						stitchTiles="stitch"
						result="turbulence"
					/>
					<feSpecularLighting
						surfaceScale="${isChromium() ? 10 / dpr : 20}"
						specularConstant="1000"
						specularExponent="20"
						lighting-color="#fff"
						in="turbulence"
						result="specularLighting"
					>
						<feDistantLight azimuth="0" elevation="40" />
					</feSpecularLighting>
				</filter>
			</defs>
			<rect width="100%" height="110%" y="-10%" />
			<rect
				width="100%"
				height="100%"
				fill="url(#gradient-${direction})"
			/>
			<rect
				width="100%"
				height="100%"
				style="mix-blend-mode: soft-light"
				filter="url(#noise-filter)"
			/>
		</svg>
	`.trim().replace(/\s+/g, ' ');

	return `data:image/svg+xml;base64,${btoa(svgContent)}`;
};

export const Separator = ({
	height = 80,
	direction = "start", // or "end"
}) => {
	const [dpr, setDpr] = useState(1);
	const [isChromiumBrowser, setIsChromiumBrowser] = useState(false);

	useEffect(() => {
		// Detect browser type once on mount
		setIsChromiumBrowser(isChromium());
		
		const inter = setInterval(() => {
			setDpr(window.devicePixelRatio);
		}, 500);
		return () => clearInterval(inter);
	}, []);

	const maskDataUrl = useMemo(() => {
		return createMaskSVG(direction, dpr, isChromiumBrowser);
	}, [direction, dpr, isChromiumBrowser]);

	return (
		<div
			key={dpr}
			className={useCascade("relative w-full")}
			style={{
				mask: `url("${maskDataUrl}")`,
				maskMode: "luminance",
				maskSize: `${height}px ${height}px`,
				height: `${height}px`,
			}}
		/>
	);
};
