import classNames from "classnames/bind";
import { createCascade } from "../../../../src";
import styles from './Logo.module.css';

const out = (str: string) => classNames.bind(styles)(str.split(' '));

const [cc, Provider] = createCascade({ out }, 'link', 'img');

type LogoProps = {
    alt: string;
    href: string;
    src: string;
};

export const LogoCascade = Provider;

export function Logo({ href, src, alt }: LogoProps) {
    return (<a href={href} className={cc.link('logoLink')} target="_blank" rel="noreferrer">
        <img src={src} className={cc.img('logo')} alt={alt} />
    </a>);
}

Logo.Cascade = Provider;