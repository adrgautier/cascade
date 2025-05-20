import { useEffect, useState } from "react";

export const Separator = ({
    height = 80,
    direction = "start", // or "end"
    backgroundColor = "#00F"
}) => {
    const [dpr, setDpr] = useState(1);

    const gradientDirection = direction === "start"
        ? { x1: "0", y1: "0", x2: "0", y2: "1" }
        : { x1: "0", y1: "1", x2: "0", y2: "0" };

    useEffect(() => {
        const inter = setInterval(() => {
        setDpr(window.devicePixelRatio);
        }, 500);
        () => clearInterval(inter);
    }, []);
        return (
        
        <div
            className="relative w-full -m-1"
            style={{
                mask: `url(#mask-${direction})`,
                WebkitMask: `url(#mask-${direction})`,
                backgroundColor,
                height: `${height}px`
            }}
        >
            <svg className={`absolute w-full z-index`} style={{ height: `${height}px` }}>
            <defs>
                <linearGradient id={`gradient-${direction}`} {...gradientDirection}>
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
                    <stop offset="100%" stop-color="#000" stopOpacity={0} />
                </linearGradient>
                <filter id="noise-filter">
                    <feFlood flood-color="#000" flood-opacity="1" result="flood" />
                    <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.5"
                    numOctaves="3"
                    seed="1"
                    stitchTiles="stitch"
                    result="turbulence"
                    ></feTurbulence>
                    <feSpecularLighting
                    surfaceScale={20 / dpr}
                    specularConstant="1000"
                    specularExponent="20"
                    lighting-color="#fff"
                    in="turbulence"
                    result="specularLighting"
                    >
                    <feDistantLight azimuth="0" elevation="40" />
                    </feSpecularLighting>
                </filter>
                <mask id={`mask-${direction}`}>
                    <rect width="100%" height="110%" y="-10%" />
                    <rect width="100%" height="100%" fill={`url(#gradient-${direction})`}/>
                    <rect
                    width="100%"
                    height="100%"
                    style={{ mixBlendMode: "soft-light" }}
                    filter="url(#noise-filter)"
                    />
                </mask>
            </defs>
        </svg>
        </div>
    );
}