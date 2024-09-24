# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Advanced React Apps WorldWise


using Vit to scafold 

Scaffolding Your First Vite Project#
Compatibility Note

Vite requires Node.js version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

bash
$ npm create vite@latest
With Yarn:

bash
$ yarn create vite
With PNPM:

bash
$ pnpm create vite@4 worldwise
Then follow the prompts!

```
pnpm create vite@4 worldwise
.../1920b1eef35-9c83                     |   +1 +
.../1920b1eef35-9c83                     | Progress: resolved 1, reused 0, downloaded 1, added 1, done
✔ Select a framework: › React
✔ Select a variant: › JavaScript

Scaffolding project in /Users/sagilevinas/Desktop/projects/my-repositiries/React-js/react-apps/advanced-react/worldwise...

Done. Now run:

  cd worldwise
  pnpm install
  pnpm run dev

  ```

  3. Config Eslint:

  3.1 open new terminal and istall the following:


  ```
  $ pnpm add eslint vite-plugin-eslint eslint-config-react-app
  ```

4. touch .eslintrx.json

4.1 // .eslintrc.json //
```
{

  "extends": "react-app",
}```

5. in vite.config.js //

```
import react from '@vitejs/plugin-react' 

import { defineConfig } from 'vite' 

<p style="color: blue;">
_import eslint from "vite-plugin-eslint"_
</p>


export default defineConfig({
  plugins: [react(), _eslint()_],
})

```
5. #### Installing react-router-dom@6

```
$ pnpm i react-router-dom@6
```


6. #### Adding json-server to fake API.

``
$ pnpm i json-server

- adding script to package.json

"scripts":{
  "server": "json-server --watch data/cities.json --port 8000 -dela;y 500"
},
```
this script is to simulate fetching from an API so we added a half a sec delay to mimik real network request.

_Note_ . #### had to downgrade json-server for "^0.17.3" and not use the latest becausee of the --delay and --route options that do not exists on the latest version.
