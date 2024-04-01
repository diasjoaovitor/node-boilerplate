# Node Boilerplate

This template provides a setup for [Node.js](https://nodejs.org/en) development

How to use:

```
npx degit https://github.com/diasjoaovitor/node-boilerplate your-project
```

## Step by Step

### create project

```
mkdir node-boilerplate
cd node-boilerplate
npm init -y
git init
```

```
npm i -D git-commit-msg-linter
```

### configure typescript and nodemon

```
npm i -D typescript ts-node @types/node nodemon
```

create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "removeComments": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "src"
  },
  "ts-node": {
    "esm": true,
    "experimentalSpecifierResolution": "node",
    "transpileOnly": true
  }
}
```

create in `src/utils/`

**sum.ts**

```ts
export const sum = (a: number, b: number) => a + b
```

**index.ts**

```ts
export * from './sum'
```

create `src/app.ts`

```ts
import { sum } from './utils'

console.log(sum(1, 2))
```

create `scripts` in `package.json`

```json
"scripts": {
  "start": "ts-node src/app.ts",
  "dev": "nodemon -e ts,json --exec npm start"
}
```

execute

```
npm start
npm run dev
```

### configure tests

```
npm i -D @types/jest jest ts-jest
```

create `jest.config.ts`

```ts
export default {
  preset: 'ts-jest',
  testRegex: '((\\.|/*.)(test))\\.ts?$',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage'
}
```

add scripts

```json
"scripts": {
  "test": "jest --maxWorkers=50%",
  "test:watch": "jest --watch --maxWorkers=25%",
  "test:ci": "jest --runInBand"
}
```

create `src/utils/sum.test.ts`

```ts
import { sum } from '.'

describe('Sum', () => {
  it('Sum a and b', () => {
    const result = sum(2, 3)
    expect(result).toBe(5)
  })
})
```

run test

´´´
npm test sum.test.ts
´´´

### configure editor

add information about the `.editorconfig` extension

```yml
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### configure linter

install **Prettier - Code formatter** and **ESLint** extension in your VSCode

```
npm i -D prettier
echo {}> .prettierrc.json
```

edit `.prettierrc.json`

```json
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true
}
```

```
npx prettier src/ --write --writeclear
```

create `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true
}
```

configure eslint

```
npm i -D eslint eslint-config-prettier @typescript-eslint/eslint-plugin eslint-config-standard-with-typescript eslint-plugin-n eslint-plugin-import eslint-plugin-promise
```

create `.eslintrc.cjs`

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off'
  }
}
```

create `.eslintignore`

```
!.jest
generators
```

add script

```json
"scripts": {
  "lint": "eslint src --max-warnings=0"
}
```

```
npm run lint
```

---

add husky and lint-staged

```
npm i -D husky lint-staged
```

```
npx husky-init
```

create `.lintstagedrc.cjs`

```js
module.exports = {
  '*.{js,ts}': (filenames) => [
    `npx prettier --write ${filenames.join(' ')} --writeclear`,
    `npx eslint --fix --ext .ts .`,
    `npm run test -- --findRelatedTests ${filenames.join(' ')} --passWithNoTests`
  ]
}
```

edit `.husky/pre-commit.sh`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

### configure alias

```
npm i module-alias
npm i -D @types/module-alias
```

create `src/config/alias-config.ts`

```ts
import { addAlias } from 'module-alias'
import { resolve } from 'path'

addAlias('@', resolve('src'))
```

add path in `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

add mappers in `jest.config.ts`

```ts
{
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

import `alias-config` in `app.ts`

```ts
import './config/alias-config'
```

case it doesn't work, import `alias-config` in `routes.ts` or in another file deeper into the tree

### configure build

create build scripts

```json
{
  "scripts": {
    "build": "tsc --build",
    "start:prod": "node dist/src/app.js"
  }
}
```

### configure ci

create `.github/workflows/ci.yml`

```yml
name: ci
on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: 'npm'

      - name: Install dependencies
        run: npm i

      - name: Linting
        run: npm run lint

      - name: Testing
        run: npm run test:ci

      - name: Build
        run: npm run build
```

### configure env

create `.env` file

```
PORT=3000
```

```
npm i dotenv
```

**app.ts**

```ts
import dotenv from 'dotenv'
import { sum } from './utils'

dotenv.config()

console.log(sum(1, 2))
console.log(process.env.PORT)
```

### ignore files in git

create `.gitignore` and add

```
node_modules
.env
dist
```
