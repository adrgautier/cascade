import type React from "react";
import { twMerge } from "tailwind-merge";

import { createCascade } from "../../../../src";

type CardProps = {
    className?: string;
    children: React.ReactNode;
}

const [cc, CardCascade] = createCascade();

export { CardCascade };

export function Card({ className = "", children }: CardProps) {
    return <div className={twMerge(cc("shadow-lg bg-slate-400 rounded-xl text-gray-800" + className))}>
        {children}
    </div>;
}
