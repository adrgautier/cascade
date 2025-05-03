import { createCascade, mapClassNames } from "../../../../src";
import styles from './Logo.module.css';

const cx = mapClassNames(styles);
const [cc, Provider] = createCascade(['link', 'img']);

type LogoProps = {
    alt: string;
    href: string;
    src: string;
};

export function Logo({ href, src, alt }: LogoProps) {
    return (<a href={href} className={cx(cc.link('logoLink'))} target="_blank" rel="noreferrer">
        <img src={src} className={cx(cc.img('logo'))} alt={alt} />
    </a>);
}

Logo.Cascade = Provider;