# Test task to mimic bower.io using libraries.io API

## Requires
- `node v20.10.0` (works on 18 too)
- `yarn v1.22.10`

## Uses
- `react` with `styled-components` styling
- `webpack` module bundler with `babel` for `Typescript` compilation
- `yarn` package manager
- `jest` unit testing with `jest-styled-components` to get fully detailed `CSS` in snapshots
- `Prettier` formatter
- `ESLint` code checker
- `lefthook` for `git` pre-commit and pre-push hooks
- `fork-ts-checker-webpack-plugin` `webpack` plugin to check `TypeScript` compilation on the fly

## How to use
- run `yarn install` in the root
- set in your local environment value `LIBRARIES_API_KEY=YOUR_KEY`
- `yarn start` to run in dev mode, with the app automatically open in the default browser.
- `yarn test` to run unit tests
- `yarn test:full` to get the code tests coverage report
- `yarn rebuild` to completely clean the caches (yarn, jest) and other work and output files and rebuild the dependencies

Also:
- `yarn compile` to check the `TypeScript` compilation
- `yarn check` to run Lint and Prettier in a check mode
- `yarn fix` to run Lint and Prettier in fix mode

## What can be improved

### UI

I used the **bower.io** site design as inspiration, but I didn't fully copy it. Some elements I used in the style of **libraries.io**.

Just for fun, I change the logo.

To showcase different backend query parameters management, I implemented no sorting by default and sorting by stars on user interaction with the possibility of resetting it.

Untill user interacts with the search input, there are no search results of the popular packages shown.

For the sake of simplicity of the test task coding, I didn't add any new UI elements for sorting and searching in the server results. I used the *"Name"* header element to reset the search parameter and the *"Stars"* header element to set sorting to `stars`.

Search result elements are not interactive.

The total amount of results can be displayed to the user.

If there are 0 results of the search query, a *"No results found"* message can be shown.

Given the additional instructions, requirements, and design, I can extend or simplify this implementation.

Screen resolution breakpoints are different for different page elements on **bower.io**. I used only `680px` for the simplicity of test task implementation.

### Unit testing
Test IDs should be added to each interactive element, and user interaction should be unit tested using mocking of components and server responses.

As the tests are implemented now, with simple snapshots (with proper `CSS` capturing) and moving the business logic from the `React` component to custom hooks, it was possible to achieve 80% + test coverage quickly and already catch many potential bugs.

### CSS
The theme should be used to store all the colours and sizes instead of hardcoding and duplicating them all over the project.

Global style should be used less. I used it a lot to set the styles of the elements in placeholders of content.

### libraries.io token usage
I used local machine environment var + `webpack.DefinePlugin` approach, `dotenv` and have `.env` `git` ignored file in the project's root folder could be used too.

### Backend data fetching
I used plain `fetch`. Some more advanced third-party libraries can be used.

### Performance
I was unsure if it is possible to get a unique combination of fields for each item of the search result to use it as a `key`, like `name` + `platform`. This is why I added the index to it.

I used `React.memo` where it made sense. Some advanced performance and rendering calls debugging can be performed, and more `React` memoisation tools can be used.

### Owner field
The `owner` field is mostly not defined in most search responses. It is possible to use `npm` or `git` API (or any other, depending on the `platform` field of the item) to fetch it additionally for each item in the search result.

### Fetching all the packages
The default search URL from **libraries.io** returns only a maximum of 30 results. Their site usually shows a very big total number for popular packages request, and there is a pagination implemented for all those results. Further investigation of the **libraries.io** API can be made, and background querying for the next/previous pages from the server can be implemented.

### Code reliability improvements
`SonarCloud` can be used for the repo.

`React` `<StrictMode>` can be used for development mode to identify potential bugs and performance issues.
