# Test task to create and showcase **`Autocomplete`** component

## Requires

- `node v20.10.0` (works on 18 too)
- `yarn v1.22.10`

## Uses

- `react v18` with `styled-components` styling and `lodash` for deep comparison
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
- `yarn fix` to run Lint and Prettier in fix mode on entire project

## How the `Autocomplete` works:

With props `{data, onQueryChanged, onItemSelected, maxOptionsToShow, minAcceptableLength, debounceInterval, placeholder, initialInput}` developers can use `Autocomplete` for common "dynamic" cases of showing strings where the search result comes from some other code - request to backend, some other function etc., where `data` - search result, `onQueryChanged`, `onItemSelected` - callbacks that will be triggered when debouncing of query will happen and when user selects an item. `initialInput` should be a text or empty string, to initialize or reset (basically, to control) the text input with a given value. `placeholder` is a default text to show in input before user starts typing.

This case is shown in a demo **`WordsScreen`**.

 - _Note:_ the `loading` status of data loading hook could be ignored, as loading gets called for the `Autocomplete`, not for the content of the screen.

 - _Note:_ I used the **WireMock** API, where the search is faked by always returning the string surrounded with random chars of random length as prefix and sufix, so the data will never be the same for the same `query` and will always return some search results.

 #### The script generating mocks on **WireMock**:
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


To use the `Autocomplete` with lists of complex custom data `T` (`Object`s, but it can be anything) - only `dataLabel` and `dataId` should be used, they should implement `T => string` and `T => string|number`. I made the `Autocomplete` in the way that developers should not know anything about internal types it uses and should not convert anything.

- _Note:_ this two functions, aswell as callbacks, should be a `useCallback` or defined outside of any react component, so that they don't trigger re-render of `Autocomplete` component, but since often developers use inline functions, I implemented deep comparision of `data` in each hook and subcomponent that uses it.

If `Autocomplete` is used for a hardcoded data ("static" mode), and the data needs to be straight-forward filtered, props `{ autoCalculate, caseSensitive, showDataOnEmptyInput }` should be used. `autoCalculate` should be set to `true`, `caseSensitive` defines if text search of `query` in data will be case sensitive, `showDataOnEmptyInput` (ignored if `autoCalculate` is `false`) defines, if the `data` without search filtering applied should be shown to user as options in the drop-down.

The two examples of this case are shown in **`CitiesScreen`**: one completely static (continents) and one (cities) with `data` changed depending on continent selected (in this case `initialInput` should be used to clean the input, as data change should not clean it automatically for "dynamic" cases, and maybe for some "static" too).

- _Note:_ I used the Map functionality from my other project just to have a fun moment of demo, it shouldn't be evaluated too much, as the `Autocomplete` is the main point of this test here.

## Limitations:

- The **uniqueness** of items in the `data` list is not checked inside of the Autocomplete, it should be checked by developer.
- **Styles** in this implementation are hardcoded (this is the shortcut I made). This can be done by either passing styles as `styled-components` `css` objects in props for `<input>`, `<ul>`, `<li>` as 3 props and merged with core styles that are needed for elements. Or render functions pattern can be used.
- **Data loading status** indicator is not implemented in : `loading` and `loadingAnimation` can be added as props to give a possibility to show loading status if `data` gets loaded.
- **Custom search filtering** function for the "static" case `data` on type T can be implemented as prop.
- **Special characters** are not filtered out from input text.
- **Big size** of `data` performance should be tested additionally.
- **Visual Testing:** Storybook can be added to test the component visually with different props combination;
- **Unit testing:** Test IDs should be added to each interactive element, and user interaction should be unit tested using mocking of components and server responses. As the tests are implemented now, with simple snapshots (with proper `CSS` capturing) and moving the business logic from the `React` component to custom hooks, it was possible to achieve ~80% + test coverage quickly and already catch many potential bugs.
- **Backend data fetching:** I used plain `fetch`. Some more advanced third-party libraries can be used.
- **`SonarCloud`** can be used for the repo, with correct setup it can be really usefull.
- `React` **`<StrictMode>`** can be used for development mode to identify potential bugs and performance issues.
- I didn't implement any of the **accessibility requirements** in this version.
- **Focus change** inside of the `Autocomplete` by arrows and focus lost can be implemented additionally.
