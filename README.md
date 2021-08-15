# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

In React, custom hooks have the purpose to group the logic related with the state and effects (useState,useEffect and another hooks) so this way the rest of the component (mostly jsx) consumes the data bring by the custom hook. Today, we take a look on this approach by implementing a timer component.

## Our component looks like this:

![Timer Component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9cmuuq3w1pw4pkyimj05.png)

This component is compose by two components more, a `<TimerDisplay/>` (blue box) and a `<TimerControls/>` (orange box)

![Timer Components](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cpiomo1fu80icnbic4qm.png)

Now, take a detailed look to their respectives codes:

### `<App/>` code looks like this.

![app code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m76wpidcwbs3a5xefvxl.png)

You notice both the state-effects logic and the jsx are within the component `<App/>` this is ok but think a moment if our Timer component requires more features is quite likely that state-effects logic grows and ofcourse the jsx too and yes, this becomes in a code hard to read, maintain and scale. And that's not all, make zoom at the return statement:

![return statement](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6b7ety4v40mgg243y2r2.png)

Like you see, the `<TimerControls/>` has the prop `setTimer`, and means this uses the state update function directly.

![Timer controls code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8zsfrrqe7xedh2vumbce.png)

Dont be scared, it's just a simple component with a few handlers in it, but yes, you guessed it, if the parent component grows `<TimerControls/>` will too.

So the solution is separate the state-effects logic and handlers and implement them througth a custom hook. In this case, our custom hook gonna be `useTimer()`. Is mandatory add the word **use** before the hook name this way **React** knows that the component uses a hook.

### `useTimer()` code looks like this.

![use timer code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3akw43vr4qboa2uu9duj.png)

In this case `useTimer()` imports the handlers cause each one requires the `setTimer()` (if you have a handler that doesn't update the state, the handlers can be consume by the component itself and not the custom hook). The new handlers code looks like this.

![handlers code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wgzm3mt8mr34efc225xn.png)

The one million question is how `<App/>` consumes `useTimer()`? Make zoom again but now at the `useTimer()` return statement:

![use timer return](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sekxuotz4we2sile9qz1.png)

`useTimer()` returns and object with timer (the state), alarmRef (it's just a ref attatched to an `<audio>` tag that plays when timer comes to zero) and the handlers (`setMinutes` , `playOrPauseTimer` and `resetTimer`). About the last ones note that are functions that returns another functions (the handlers imported) aka closures, now see how the components look like:

### `<App/>`

![App component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4djszhweu9kaytcf4c1y.png)

### `<TimerControls/>`

![timer controls](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/heo2sl7105oxahju7xoe.png)

## Conclusions

- If you think that your components code gonna grow, separate the state-effects logic and handlers througth a custom hook.
- If your components handlers require update the state use them within a custom hook.
- Don't forget the **use** word before name your hook.
- Some React experts think that React more that an UI library is a mental model, so the most important hook that you can use is `useYourImagination`
