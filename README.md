# Test task to create and showcase **`Autocomplete`** component

## Requires

- `node v20.10.0` (works on 18 too)
- `yarn v1.22.10`

## Uses

- `react v18` with `styled-components` styling and `lodash` for deep comparison of props
- `webpack` module bundler with `babel` for `Typescript` compilation
- `yarn` package manager
- `jest` unit testing with `jest-styled-components` to get fully detailed `CSS` in snapshots
- `Prettier` formatter
- `ESLint` code checker
- `lefthook` for `git` pre-commit and pre-push hooks
- `fork-ts-checker-webpack-plugin` `webpack` plugin to check `TypeScript` compilation on the fly

## How to use

- run `yarn install` in the root (or just `yarn`)
- `yarn start` to run in dev mode, with the app automatically open in the default browser.
- `yarn test` to run unit tests
- `yarn test:full` to get the code tests coverage report
- `yarn rebuild` to completely clean the caches (yarn, jest) and other work and output files and rebuild the dependencies

Also:

- `yarn compile` to check the `TypeScript` compilation
- `yarn check` to run Lint and Prettier in a check mode
- `yarn fix` to run Lint and Prettier in fix mode on the entire project

## How the `Autocomplete` works:

With props `{data, onQueryChanged, onItemSelected, maxOptionsToShow, minAcceptableLength, debounceInterval, placeholder, initialInput, loading, LoadingAnimation, keepDropDownOnSelect, setInputToSelected}` developers can use `Autocomplete` for common "dynamic" cases of showing strings where the search result comes from some other code - request to backend, some other function etc.
- `data` - search result;
- `onQueryChanged` - callback that is triggered when debouncing of `query` will happen;
- `onItemSelected` - callback that is triggered when the user selects an item;
- `initialInput` - if it's a text or empty string, it initializes or resets (basically, controls) the text input with a given value;
- `placeholder` - a default text to show in the input before the user starts typing;
- `loading` - weather drop-down should show loading animation;
- `LoadingAnimation` - which animation to show;
- `keepDropDownOnSelect` - configures if drop-down should be opened when the item was selected by the user;
- `setInputToSelected` - configures if input should be updated with the selected item label (useless for continents and cities selectors, as almost always requires erasing of current value to get the full list of continents or cities, and selected values are shown on map and a map caption);

There can be other configurational properties, depending on the project needs.

This case is shown in a demo **`WordsScreen`**.

 - _Note:_ I used the **WireMock** API, where the search is faked by always returning the string surrounded with random chars of random length as prefix and suffix added to `query`, so the `data` will never be the same for the same `query` and will always return some search results.
 - _Note:_ in `contentFetcher` each request/response is stored with `query`. This way when there are lots of queries triggered only the one for the latest `query` will be dispatched.
 - _Note:_ as `contentFetcher` is implemented to specifically serve search words by `query` and it shouldn't be universal in this project, I didn't implement the erasing of previous `data` in its state, to be able to show previous search results in case of errors. It can be converted into a more universal one, either by making erasing of previously loaded `data` configurable or by preserving non-empty `data` in a separate state outside of this universal hook.

 #### The script generating mocks on **WireMock** (for **`WordsScreen`** demo example):
 **`/search`**
 ```
 [
  {{#each (range 0 (randomInt lower=5 upper=20))}}
    {{#if @last}}
      "{{randomValue length=(randomInt lower=4 upper=15) type='ALPHANUMERIC'}}"
    {{else}}
      "{{randomValue length=(randomInt lower=4 upper=15) type='ALPHANUMERIC'}}",
    {{/if}}
  {{/each}}
]
 ```
**`/search?name=...`**
```
[
  {{#each (range 3 (randomInt lower=4 upper=20))}}
    {{#if @last}}
      "{{randomValue length=(randomInt lower=0 upper=4) type='ALPHANUMERIC'}}{{request.query.name}}{{randomValue length=(randomInt lower=0 upper=4) type='ALPHANUMERIC'}}"
    {{else}}
      "{{randomValue length=(randomInt lower=0 upper=4) type='ALPHANUMERIC'}}{{request.query.name}}{{randomValue length=(randomInt lower=0 upper=4) type='ALPHANUMERIC'}}",
    {{/if}}
  {{/each}}
]
```

To use the `Autocomplete` with `data` as list of complex custom type `T` (mostly `Object`s, but it can be anything) - only `dataLabel` and `dataId` should be used, they should implement `T => string` and `T => string|number`. I made  `Autocomplete` so that developers would not know anything about the internal types it uses and should not convert anything. This is the case for the list of cities in demo.

- _Note:_ these two functions, as well as callbacks and `LoadingAnimation`, should be a `React.useCallback` or defined outside of any React component so that they don't trigger re-render of `Autocomplete` component, but since often developers use inline functions, I implemented a deep comparison of `data` in each hook and subcomponent that uses it.

If `Autocomplete` is used for hardcoded data ("static" mode), and the data needs to be straight-forward filtered, props `{ autoCalculate, caseSensitive, showDataOnEmptyInput }` should be used.
- `autoCalculate` should be set to `true` for this case;
- `caseSensitive` defines if text search of `query` in `data` will be case sensitive;
- `showDataOnEmptyInput` - defines, if the `data` without search filtering applied should be shown to the user as options in the drop-down (it is ignored if `autoCalculate` is `false`);

The two examples of this case are shown in **`CitiesScreen`**: one completely static (continents) and one (cities) with `data` changed depending on the continent selected (in this case `initialInput` should be used to clean the input, as data change should not clean it automatically for "dynamic" cases, and maybe for some "static" too).

## Limitations and shortcuts:

- The **uniqueness** of items in the `data` list is not checked inside of the Autocomplete, it should be checked by the developer.
- **Styles** in this implementation are hardcoded (this is the shortcut I made). This can be done by passing styles as `styled-components` `css` objects in props for `<input>`, `<ul>`, `<li>` as 3-4 props (for `<input>`, `div`, `<ul>`, `<li>`) and merging them with core styles that are needed for elements. Or render functions pattern can be used. Or other ways - it highly depends on styling libraries and engines and the general styling approach of the project.
- **Design** is not responsive and not adjusted for mobile devices;
- **`LoadingAnimation`** can be extended to take not only a ComponentType but also any `JSX` element, depending on project needs.
- **Custom search filtering** function for the "static" case `data` on type T can be implemented as a prop.
- **Special characters** are not filtered out from input text.
- **Big size** of `data` performance should be tested additionally.
- **Visual Testing:** Storybook can be added to test the component visually with different props combination;
- **Unit testing:** Test IDs should be added to each interactive element, and the user interaction should be unit tested using mocking of components and server responses. As the tests are implemented now, with simple snapshots (with proper `CSS` capturing) and moving the business logic from the `React` component to custom hooks, it was possible to achieve ~80% + test coverage quickly and already catch many potential bugs.
- **Backend data fetching:** I used plain `fetch`. Some more advanced third-party libraries can be used.
- If new query has to be fetched, while there is one fetch is in the process, the old one will be ignored. But additionally **fetching canceling** can be implemented.
- **`SonarCloud`** can be used for the repo, with the correct (non-blocking) setup it can be useful.
- `React` **`<StrictMode>`** can be used for development mode to identify potential bugs and performance issues.
- I didn't implement any of the **accessibility requirements** (WCAG) in this version.
- **Focus change** inside of the `Autocomplete` by up/down keyboard arrows pressing and focus lost can be implemented additionally.
- **`TypeBox`** can be used for runtime type checking.
