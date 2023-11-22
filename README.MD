# block-site-zen-chrome-ext

🧘🏻‍♂️ BlockSiteZen : block and regain your freedom !

# TODO

OPTIONS

- refactor(color-system): make it coherent
  -- options.html
- feat(interval): design interval
- feat(interval): add effects
- refactor MOVE ALL `:global`

- refactor

```
:global(.input .error-msg svg) {
    height: 16px;
    width: 16px;
    margin-inline-end: 4px;
  }
```

- feat(interval): save in store
- feat(interval): detect in content.js
- feat(popup): change message, when user add blocked url directly in options.html
- feat(options): arrow down list (to indicate it is... a list)

- add a logo for my extension
- ci(prod): deploy to PROD

REFACTO

- refactor color CSS variables name
- refacto(chrome-api): externalize "send message" code
- add message error if already exists ?
- remove chrome.storage eslint error

BONUS

- transition svelte ?
- stats of most visited url ?
- move all "utils" in gist

# RUN

- `pnpm build`
- `pnpm preview`
