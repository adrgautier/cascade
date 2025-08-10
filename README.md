# ![use-cascade](./packages/use-cascade/assets/use-cascade.svg)

![typescript](https://img.shields.io/badge/written%20for-typescript-3178c6?style=flat-square) ![biome](https://img.shields.io/badge/checked%20with-biome-60a5fa?style=flat-square) ![vitest](https://img.shields.io/badge/tested%20with-vitest-729b1b?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/adrgautier/cascade?style=flat-square&token=IPTGBDRRJE)](https://codecov.io/gh/adrgautier/cascade) [![npm](https://img.shields.io/npm/v/use-cascade?style=flat-square)](https://www.npmjs.com/package/use-cascade)

A better way to manipulate class names in React with support for Tailwind CSS and CSS Modules.

## Project Structure

This is a monorepo containing:

- **`packages/use-cascade/`** - The main use-cascade library
- **`apps/docs/`** - Documentation website with examples and guides

## Quick Start

```bash
npm install use-cascade
```

```tsx
import { createCascade } from 'use-cascade';

const [useCascade, CascadeProvider] = createCascade();

function Button() {
  return <button className={useCascade('btn')}>Click me</button>;
}

function App() {
  return (
    <CascadeProvider className="btn-primary">
      <Button /> {/* Will have classes: "btn btn-primary" */}
    </CascadeProvider>
  );
}
```

## More Information

Please check the [README](./packages/use-cascade/README.md) from the use-cascade package for complete documentation.
