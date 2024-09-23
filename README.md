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