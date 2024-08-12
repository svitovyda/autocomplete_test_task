1. In very simple words, `Component` and `PureComponent` are the analogue of `React.FC` and `React.memo(...)`. `PureComponent` is a subclass of `Component` that implements a `shallow comparison` of both `props` and `state`. It can improve performance by preventing unnecessary renders (if `props` don't contain children, `callback` functions as literals). However, it can cause issues when `props` contain mutable `Array`s and `Object`s. A `shallow comparison` will compare them in `props` by references, not by their value elements and fields. In this case, it will break the app by the component that was a `Component` but became a `PureComponent` will stop reacting to the changes of `props`, to which `Component` would react.

2. In general, the issue of `Context` is that its provider wraps a tree of components and will cause re-rendering of each of its consumers, no matter which fields of the context value the component needs and which fields were updated. A very sophisticated `props` comparison should be implemented.
    And the general problem of using `shouldComponentUpdate`, as far as I remember, is that it is easy to forget to include the direct comparison of `state`, part of which the `Context` value is. Then if `shouldComponentUpdate` returns false, but the context value changed, it will not trigger re-render.

    It is important to include in the `shouldComponentUpdate` implementation comparison of all the possible values, `props` and `state` ones.

3. I know 5 :) -
    - `callback` `function` provided in `props`;
    - via `ref`s and forwarding `ref`s (these two are quite limited to direct parent without additional implementation like `props` drilling);
    - `Context`;
    - using any third-party `state` manager like `Redux`;
    - using streaming like `RxJS` or `knockout` (last three are enabling passing the information to any components, parent and child on any level and parallel ones);

4. First of all, there is old good advice from **Den Abramov**: before jumping into any cool `React` memoisation - split the component into separate subcomponents if different parts of its render use different `state` values, as any `state` value change will make the entire component re-render, not only the elements that depend on the changed `state` value.
    - For **`React Class Components`**:
        - using `PureComponent`;
        - using`shouldComponentUpdate` when it returns false;
    - For **`React Functional Components`**:
        - using proper dependencies list in `useEffect` and in addition implement `prev{Value}` `ref`;
        - use `React.memo` and `useCallback` for each `callback` `function` that is passed into it as `props` (will not work if component takes `children` unless there will be complex additional implementations on memoising `children` rendering `function`);
        - `React.useMemo` and `useRef` for values, used inside the component;
        - third-party solutions possibilities like using `reselect` for `Redux`;

5. It's also used as `<>...</>`, but with props it should be `<Fragment>`. It's a special component that is used to wrap several `JSX` elements into one, as each `React` component render should `return` only one element. It allows for improved performance by not adding unnecessary dom node like `<div>`.

    One sure downside of using it that I experienced - `CSS` can get lost in some cases, like `widt=100%`.
    Another issue that I know is that it can't have the `key` set - but this one should lead to the compilation error, to not silently break the app.
    This is a good example of why the first things I do on an outdated project that needs to be refactored - convert all the `*.JS` to `*.TS` and implement `typescript` compilation (with simplest rules and hundreds of `// @ts-ignore`: once refactoring starts, any new change will be secured from introducing issues like this.

6. I never thought of types of `HOC` patterns, but these are the examples I came up with:
    - **"Wrapping HOC"** - doesn't change the component nor its `props`, just wraps it into condition or additional UI elements. Could be some adding the caption, showing the error state / loading state / component, showing additional buttons and content if the user is authorised etc.;
    - **"Modifying `props`"** - a component that uses the given component as is, but changes it by rendering it (maybe wrapped too) and manipulating its `props` (not exposing some of them), like showing the timer, countdown, result of fetching the data;
    - **"Modifying component"** (only for class components) - inheriting the component and implementing its lifecycle methods;

7.
    - In the `callback`s it should wrap its implementation into `try...catch` and `return` the error as part of the result of the `function` call.
    - `Promise`s can `return` a success result, that can be handled as `.then` or an error - handled as `.catch.`
    - `async/await` is a syntax sugar for `Promise`s. It can use `try...catch` and also if it is used as an async `function` - its result is a `Promise` that can be chained with `then...catch`.

8. `setState` takes two parameters - `new value` (value or `function`, that gets previous value and returns new value) and `callback`. It is asynchronous for performance reasons (batching) and to avoid inconsistent `state` result when it is called several times before the component gets re-rendered.
    To avoid any issues in cases when a new `state` value is based on its previous value, it is better to use a `function` as a new value to have full control over the value of the previous `state`.

9. Steps are:
    - Convert a definition and remove `render`, leave just `return`(s);
    - Remove `constructor`;
    - Convert `state` management;
    - Convert lifecycle methods to hooks (this one is not easy, as they are not correspond one to one easily, like `componentDidMount` will not be called same times as `useEffect(() => {...}, []`, and there is no hook to replace `componentDidCatch` etc.);
    - remove all usages of `this`;
    - convert usage of `Context` to `useContext` hook;
    - fix using of `ref`s

10.
    - Using `CSS` inline (`<... style={{...}}>` or `<style>` tag);
    - importing `CSS` file (using `css-loader` and updating `webpack` config - I had to use it in the test app for the `MapView` component);
    - third-party libraries like `styled-components`, `emotion`, `matherial`;
    - using `preprocessor`s like `less`, `scss`;

11. By using `innerHTML` of the `HTMLElement` get by `ref`, maybe `htmlDecode` should be involved. _I would google this one, I'm not sure how it works in `React`_

_Note:_ I don't have deep experience with `React Class Components`, I was lucky to have projects that quickly migrated to `React Functional Components` and `hook`s. I would preffer to google each step before refactoring complex `Class Component`
