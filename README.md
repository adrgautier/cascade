# useCascade

New approach for styles in react.

## Principles

This lib offers a way to override styles by cascading className and styles props using a context.

### Consume

```tsx
function TextInput() {
    const cs = useCascade();
    
    return <input type="text" {...cs('input')} />
}
```

### Provide

```tsx
function Form() {
    const  cs = useCascade();
    
    return (<Cascade on='input' {...cs('field')}>
        <Input />
    </Cascade>);
}
```

### Customising the hook

