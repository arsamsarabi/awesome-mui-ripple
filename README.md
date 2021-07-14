# awesome-mui-ripple

> Add MUI ripple effect to your React components 😎

## How to

Install awesome-mui-ripple in your project
```bash
  $ yarn add awesome-mui-ripple
```

Follow the example below on how to include Ripple in your components.
1. import Ripple from 'awesome-mui-ripple'
2. const ripple = new Ripple();
3. ripple.animate(event)   

```javascript
import React, { FC, useState, MouseEvent } from 'react'
import { Ripple } from 'awesome-mui-ripple'

export type MyAwesomeButtonProps = {
  foo: 'bar'
}

const MyAwesomeButton: FC<MyAwesomeButtonProps> = () => {
  const [count, setCount] = useState<number>(0)
  const ripple = new Ripple()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCount(count + 1)
    ripple.animate(event)
  }

  return (
    <>
      <p>Ripple count: {count}</p>
      <button onClick={handleClick}>Ripple!</button>
    </>
  )
}

export default MyAwesomeButton
```

> 💡 The animate function takes a second optional parameter for the color of the ripple.
> The color parameter on the animate function should be a string color value or alternatively you can pass 'dark' or 'light' to use one of the default color.

```javascript
const defaultColors= {
  light: 'rgba(255,255,255, 0.3)',
  dark: 'rgba(0,0,0, 0.2)',
}
```
