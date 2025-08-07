# use-cascade

 ![typescript](https://img.shields.io/badge/written%20for-typescript-3178c6?style=flat-square) ![biome](https://img.shields.io/badge/checked%20with-biome-60a5fa?style=flat-square) ![vitest](https://img.shields.io/badge/tested%20with-vitest-729b1b?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/adrgautier/cascade?style=flat-square&token=IPTGBDRRJE)](https://codecov.io/gh/adrgautier/cascade) [![npm](https://img.shields.io/npm/v/use-cascade?style=flat-square)](https://www.npmjs.com/package/use-cascade)


A better way to manipulate class names in React with support for Tailwind and CSS Modules.

## Motivation

*classNames* is a great tool to manipulate classes in React. However, every time I use **classNames**, I need to create a new prop to provide additional classes from a parent component: 

```jsx
const TextInput = ({ className, ...props }) => {
    return <input type="text" className={classNames('input', className)}>; 
}
```

*use-cascade* intend to remove className props by using the context instead.

## Quick example

The `createCascade` function returns a tuple with a *consumer* function and a *Provider* component.

```ts
import { createCascade } from 'use-cascade';

const [ useCascade, CascadeProvider ] = createCascade();
```

### The *consumer* function

The *consumer* function **combines** the class names passed as **direct arguments** with the class names provided in **the context**.

The direct arguments can be used to give the "base" style to your element:

```tsx
export function TextInput() {
    return <input type="text" className={useCascade('input')} />
}
```

### The *Provider* component

The *Provider* component is a context provider that will provide the class names to its children.

First we need to export the *Provider* component from the file:

```tsx
export const TextInputCascade = CascadeProvider;
```

Then we can use it in our component tree, to provide new class names to the cascade:

```tsx
import { TextInput, TextInputCascade } from './TextInput';

function InputField() {
    return (<TextInputCascade className="fieldInput">
        <TextInput />
    </TextInputCascade>);
}
```

In this example, the input element will receive, as className prop the value `"input fieldInput"`.


## The providers *Cascade*

In react, the context provider **the closest** to the consumer will override the other providers above in the components tree.

```tsx
function App() {
    return <Provider value="ignored value">
        <Provider value="consumed value">
            <Consumer />
        </Provider>
    </Provider>
}

```

In *use-cascade* however, providers are "cascading". Every class names provided in the tree will be received by the consumer. Using the previous `inputField` example, we can add another provider to the component tree:

```tsx
import { TextInputCascade } from './TextInput';
import { InputField } from './InputField';

function Form() {
    return (<TextInputCascade className="formInput">
        <InputField />
    </TextInputCascade>);
}
```

In this example, the input element will receive, as className prop the value `"input formInput fieldInput"`.

 ### *Providers* priority

 > Class names order is only relevant using tools like `tailwind-merge`. In `tailwind-merge` the first class names have **less priority** than the last ones.

 The `consumerFunction` returns the class names passed as **direct arguments** first, then the class names provided in the cascade starting from the top of the tree. That means, the more "specific" is a provider, the more priority will have the provided class names. 

 If that logic does not suite your use case, you may want to create a new cascade:

```tsx
const [ useCascade, CascadeProvider ] = createCascade();

export const InputFieldCascade = CascadeProvider;

function InputField() {
    return (<TextInputCascade className={useCascade(/*...*/)}>
        <TextInput />
    </TextInputCascade>); 
}
```

In this case, the `InputFieldCascade` provider will have the priority over `TextInputCascade`.

## API

The `createCascade` function can be called in different ways. 

### `createCascade()`

The `createCascade` function can be called without any argument. It returns a tuple with a *consumer* function and a *Provider* component:

```ts
[
    (className: string) => string, 
    FunctionComponent<{ className: string; children: ReactNode; }>
]
```

By default, the *consumer* function only accepts a single string.

### `createCascade(options)`

The `createCascade` function can also be called with an `options` object.

```ts
type Options = {
	in?: (...args: any[]) => string;
	out?: (a: string) => string;
};
```

The `options` allows to transform the arguments and the return value of the *consumer* function.

#### The `in` function

The `in` function allows to transform **the arguments** passed to the *consumer* function into a **single string**.

Using `classnames` lib as an example, you can rewrite the following code:
```ts
import classNames from "classnames";

const [ useCascade ] = createCascade();
const className = useCascade(classNames('input', { isFocused }));
```

Like this:
```ts
const [ useCascade ] = createCascade({ in: classNames });
const className = useCascade('input', { isFocused });
```

The *consumer* function inherits the signature of `in` function provided in the `options` object. This way, any function can be used as long as it returns a string.

#### The `out` function

The `out` function allows to transform the **return value** of the *consumer* function into a **single string**.

Using `tailwind-merge` lib as an example, you can rewrite the following code:
```ts
import { twMerge } from "tailwind-merge";

const [ useCascade ] = createCascade();
const className = twMerge(useCascade('shadow-lg bg-slate-600 rounded-xl'));
```

Like this:
```ts
const [ useCascade ] = createCascade({ out: twMerge });
const className = useCascade('shadow-lg bg-slate-600 rounded-xl');
```

The `out` function must accept at least a string as the first argument and must return a string.

### `createCascade(...elements)`

The `createCascade` function can be called with the list of elements in the cascade.

```ts
const [ useCascade, CascadeProvider ] = createCascade(
    'wrapper', 'title', 'description',
);

export const ArticleCascade = CascadeProvider;
```

This creates a *consumer* function for each element:

```tsx
<article className={useCascade.wrapper('wrapper')}>
    <h1 className={useCascade.title('title')}>Title</h1>
    <p className={useCascade.description('description')}>
        {/* description */}
    </p>
</article>
```

This also creates a *provider* component for each element. This ensures targeting a specific element when providing new class to the cascade:

```tsx
<ArticleCascade.wrapper className={'listArticle'}>
    {articles.map((item) => <Article {...item} />)}
</ArticleCascade.wrapper>
```


### `createCascade(options, ...elements)`

The `createCascade` function can be called with both the list of elements in the cascade.
The is combines the behaviors described in the above sections.

```ts
const [ useCascade, CascadeProvider ] = createCascade(
    { in: classNames.bind(styles) },
    'wrapper', 'title', 'description',
);
```

## Guide

### Using with CSS modules

If you already use `classnames`, you may be familliar with its "bind" approach:

```ts
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
```

This approach can be used to transform the class names provided to the *consumer* function into their hashed version.

```ts
const [ useCascade ] = createCascade({ in: classNames.bind(styles) });
```

> This **does not** transform the class names provided outside the component. To achieve this behavior you must use the `out` function. `classnames` requires to split the classes to work properly:
>
>```ts
>const [ useCascade ] = createCascade({ 
>    out: (classes: string) => classNames.bind(styles)(classes.split(" ")) 
> });
>```

### Using Tailwind

If you use Tailwind, you may want to deduplicate classes and override already defined rules. `tailwind-merge` is the tool for you:

```ts
twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
// returns → 'hover:bg-dark-red p-3 bg-[#B91C1C]'
```
`twMerge` must be used as the `out` function:

```ts
const [ useCascade, CascadeProvider ] = createCascade({ out: twMerge });

export const TextInputCascade = CascadeProvider;
```

Using the same values as the above example:

```tsx
// TextInput component
<input type="text" className={useCascade('px-2 py-1 bg-red hover:bg-dark-red')} />

// parent component
<TextInputCascade className="p-3 bg-[#B91C1C]">
    {/* ... */}
</TextInputCascade>
```

Under the hood, the `twMerge` helper will produce the expected class combination.
