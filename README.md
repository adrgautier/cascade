# Cascade

 ![typescript](https://img.shields.io/badge/written%20for-typescript-3178c6?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/adrgautier/cascade?style=flat-square&token=IPTGBDRRJE)](https://codecov.io/gh/adrgautier/cascade) ![prettier](https://img.shields.io/badge/code%20style-biome-6ca8f7?style=flat-square) [![npm](https://img.shields.io/npm/v/use-cascade?style=flat-square)](https://www.npmjs.com/package/use-cascade)


New approach for styles in react.

## Motivation

## Quick example

First, create a new *Cascade*. 

```ts
import { createCascade } from 'use-cascade';

const cc = createCascade();
```

As its core, a *Cascade* is a function that **combines** the classnames passed as **direct arguments** with the classnames provided **in the context(s)**.

The direct arguments can be used to give the "base" style to your element:

```tsx
export function TextInput() {
    return <input type="text" className={cc('input')} />
}
```

The *Cascade* gives you access to a *Provider* component with the `Provider` property.

> ### 💡 Idea
> You can expose the *Provider* along-side the actual component like so:
>```ts
>TextInput.Cascade = cc.Provider;
>```

On a parent component, you can provide new classnames to the cascade like so:

```tsx
function Form() {
    return (<TextInput.Cascade className="formInput">
        <TextInput />
    </TextInput.Cascade>);
}
```

In this example, the input element will receive both `'input'` and `'formInput'` classnames.

## Advanced usage

### Custom combine function

As introduced above, the main feature of the *Cascade* is to *combine* multiple classnames (from direct arguments and the context).

The default combine function only understand an array of strings, and join them using a space:
```ts
function combine(...args: string[]): string {
	return args.join(" ");
}
```

But a *Cascade* can be much more versatile if you provide your own combine function:

#### `classnames`

You can provide the `classnames` helper as the first argument of `createCascade` when creating a new *Cascade*:

```ts
import classNames from 'classnames';

const cc = createCascade(classNames);
```

The resulting `cc` function accepts the same arguments as the provided helper:

```tsx
export function TextInput({ focused, value }: TextInputProps) {
    return <input type="text" className={cc('input', { focused, empty: !value })} />
}
```

The *Provider* component also changes accordingly to the merge function: 
```tsx
<TextInput.Cascade className={[{ highlight: true }]}>
    <TextInput />
</TextInput.Cascade>
```

(More details in the **Provider** section.)

#### `classnames` (bind)

If you use css modules, you may want to use the "bind" approach from `classnames`:

```ts
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
```

Because of typings constraints you must use the bind helper provided by `use-cascade`:

```ts
import classNames from 'classnames/bind';
import { createCascade, bind } from 'use-cascade';

const cc = createCascade(bind(classNames, styles));
```

#### `tailwind-merge`

If you use tailwind, you may want to deduplicate classes and override already defined rules. `tailwind-merge` is the tool for you:

```ts
twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
// → 'hover:bg-dark-red p-3 bg-[#B91C1C]'
```

As usual, you can create a Cascade with that custom combine function:

```ts
const cc = createCascade(twMerge);
```

Using the same values as the above example:

```tsx
// TextInput component
<input type="text" className={cc('px-2 py-1 bg-red hover:bg-dark-red')} />

// parent component
<TextInput.Cascade className="p-3 bg-[#B91C1C]">
    {/* ... */}
</TextInput.Cascade>
```

Under the hood, the `twMerge` helper will produce the expected class combination.

### Provider approaches

The Provider component allows to override a className with several approach.

#### `string`

As seen in the quick example we can pass a `string` value to the className prop:

```tsx
function Form() {
    return (<TextInput.Cascade className="formInput">
        <TextInput />
    </TextInput.Cascade>);
}
```

In this situation the string is added to the *Cascade*.

#### `TValue[]`

As seen in the `classnames` example we can pass an array of values.

