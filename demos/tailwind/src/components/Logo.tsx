import { createCascade, mapClassNames } from "../../../../src";
import styles from './Logo.module.css';

const cc = createCascade(mapClassNames(styles));

type LogoProps = {
    alt: string;
    href: string;
    src: string;
};

export function Logo({ href, src, alt }: LogoProps) {
    return (<a href={href} target="_blank" rel="noreferrer">
        <img src={src} className={cc('logo')} alt={alt} />
    </a>);
}

Logo.Cascade = cc.Provider;