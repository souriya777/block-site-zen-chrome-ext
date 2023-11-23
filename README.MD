# block-site-zen-chrome-ext

🧘🏻‍♂️ BlockSiteZen : block and regain your freedom !

# TODO

OPTIONS

- feat(interval): add rules on intervals
- feat(interval): can select one ore more intervals
- refactor

```
:global(.input .error-msg svg) {
    height: 16px;
    width: 16px;
    margin-inline-end: 4px;
  }
```

- refactor MOVE ALL `:global`
- design(options): refactor colors
- feat(interval): save in store
- feat(interval): detect in content.js
- feat(popup): change message, when user add blocked url directly in options.html
- feat(options): arrow down list (to indicate it is... a list)
- add a logo for my extension
- ci(prod): deploy to PROD
- refactor color CSS variables name
- refacto(chrome-api): externalize "send message" code
- add message error if already exists ?
- remove chrome.storage eslint error
- transition svelte ?
- move all "utils" in gist

# RUN

- `pnpm build`
- `pnpm preview`
