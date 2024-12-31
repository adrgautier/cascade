# use-cascade

 ![typescript](https://img.shields.io/badge/written%20for-typescript-3178c6?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/adrgautier/cascade?style=flat-square&token=IPTGBDRRJE)](https://codecov.io/gh/adrgautier/cascade) ![prettier](https://img.shields.io/badge/code%20style-biome-6ca8f7?style=flat-square) [![npm](https://img.shields.io/npm/v/use-cascade?style=flat-square)](https://www.npmjs.com/package/use-cascade)


A better way to manipulate class names in React with support for Tailwind and CSS Modules.

## Motivation

**classNames** is a great tool to manipulate classes in React. However, every time I use **classNames**, I need to create a new prop to provide additional classes from a parent component: 

```jsx
const MyComponent = ({ className, ...props }) => {
    return <div className={classNames('my-component', className)}>; 
}
```

**Cascade** is like `classNames` but attached to a context in which you can provide additional class names.

No more `className` props!

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

In this example, the input element will receive, as className, the value `"input formInput"`.

## Accepted arguments

The Provider allows to handle the parameters in the *Cascade* in serveral ways.

### Simple `string`

As seen in the quick example we can pass a `string` value to the className prop:

```tsx
<TextInput.Cascade className="formInput">
    {/*...*/}
</TextInput.Cascade>
```

The string is **added** to the *Cascade* (at the end of the inherited parameters array).

### **Array** of parameters

You can also pass an array of parameters. The accepted values are infered from the accepted values of the *combine* function.

```tsx
<TextInput.Cascade className={['italic', 'bold']}>
    {/*...*/}
</TextInput.Cascade>
```

The new parameters are **added** to the *Cascade* (at the end of the inherited parameters array).

### Falsy parameters



### **Simple mapping**


### **Match/Conditional** mapping

Passing a *Record* allows to add parameters to the *Cascade* conditionally. The keys *Record* are the targets (only strings are allowed). The values are either a simple `string` or an *array* of parameters. 

```tsx
<TextInput.Cascade className={{ 'target1': ['italic', 'bold', 'target2': 'exposant']}}>
    {/*...*/}
</TextInput.Cascade>
```

If the target is found in the inherited parameters, the new parameter(s) are **added** to the *Cascade* (at the end of the inherited parameters array).

> Note: The exact string is expected in the inherited parameters.

## Use cases

### `tailwind-merge` for better tailwind DX

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

### Using with CSS modules

If you already use `classnames`, you may be familliar with its "bind" approach:

```ts
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
```

Cascade provides a mapClassNames factory that create a post-processing function according to a mapping of classNames.

```ts
const cc = createCascade(mapClassNames(styles));
```

Because this transformation happens at the very end it ensures match/conditional mapping rely on local names (without hash).

But another benefit is to be able to enable a local class name from outside the component.

```tsx
<Alert.Cascade className="error">
    <Alert>Something went wrong!</Alert>
</Alert.Cascade>
```

## Priority/Specificity

An important part of styling is handling priority. In regular CSS, a declaration is applied according to: 
- its order (last-one in the cascade is used)
- the specificity of the selector (a more specific selector has the priority)

Of course the order of the class names in the `class` attribute is not relevant. However, it is important when using deduping tools like **tailwind-merge** that expect the last class to have priority other the first one.

To work properly **Cascade** must  compute the className with the following logic:

Three group of class names are identified and organize in the following order:
First the class names provided to the consumer,  
then the class names provided in the context,
finally the class names provided in the context with conditional mapping.

Inside each group, class names are ordered as provided.

When using multiple providers, the order depends on the specificity:
```tsx
<Component.Cascade className={["A", "B"]}>
    <Component />
    <Component.Cascade className="C">
        <Component />
    </Component.Cascade>
</Component.Cascade>
```

This allows to apply some class names globally that can be overrided by more specific class names. 

If that logic does not suite your use case, you may want to create a new cascade:

```tsx
const cc = createCascade();

function PasswordInput() {
    return (<TextInput.Cascade className={cc(/*...*/)}>
        <TextInput />
    </TextInput.Cascade>); 
}

PasswordInput.Cascade = cc.Provider;
```

In this case, `PasswordInput.Cascade` will have the priority over `TextInput.Cascade`.
