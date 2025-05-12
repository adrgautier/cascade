import type React from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { createCascade } from "../../../../src";

type CardProps = {
    className?: string;
    children: React.ReactNode;
}

const [ cc, ProvideCascade ] = createCascade({ in: classNames, out: twMerge});

export const CardCascade = ProvideCascade;

export function Card({ className = "", children }: CardProps) {
    return <div className={cc("shadow-lg bg-slate-600 rounded-xl text-gray-800", className)}>
        {children}
    </div>;
}
