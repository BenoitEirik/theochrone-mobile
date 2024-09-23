# Test plan

## Unit tests

### Tested elements

- **composables**
  - unit: composables
- **stores**
  - unit: Pinia actions (methods), getters and setters (computed)
- **utils**
  - unit: functions

### Test environment

- environment: jsdom
- runner: vitest
- dépendancies: @nuxt/test-utils
- command: `pnpm test`

### Risks

~~Happy DOM performs better than jsdom. However, it is limited in terms of DOM manipulations as well as browser APIs. May need to consider using jsdom instead of Happy DOM if necessary.~~

We moved to jsdom: operations on a virtual DOM to retrieve mass informations throw a lot of errors with Happy DOM.

### Sources

- <https://nuxt.com/docs/getting-started/testing>
- <https://capacitorjs.com/docs/guides/mocking-plugins>
