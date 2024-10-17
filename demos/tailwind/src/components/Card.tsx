import type React from "react";
import { twMerge } from "tailwind-merge";
import { createCascade } from "../../../../src";

type CardProps = {
    className?: string;
    children: React.ReactNode;
}

const cc = createCascade(twMerge);

export function Card({ className = "", children }: CardProps) {
    return <div className={cc("shadow-lg bg-slate-400 rounded-xl text-gray-800", className)}>
        {children}
    </div>;
}

Card.Cascade = cc.Provider;