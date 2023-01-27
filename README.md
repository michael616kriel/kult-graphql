# @kult/graphql

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/michael616kriel/kult-graphql.svg)](https://github.com/michael616kriel/kult-graphql/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/michael616kriel/kult-graphql.svg)](https://github.com/michael616kriel/kult-graphql/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

Graphql plugin for [@kult/core](https://michael616kriel.github.io/kult-core/)

Have a look at our [docs](https://michael616kriel.github.io/kult-docs/) for more information.

## Installation

yarn:

```
yarn add @kult/graphql
```

NPM:

```
npm i @kult/graphql
```

## Usage

Register the plugin in `./src/app/config/plugins.ts`

```
import KultGraphqlPlugin from '@kult/graphql';

export default {
  plugins: [KultGraphqlPlugin],
};
```

### Environment Variables

Ensure this port is different than your server's port

```
GRAPHQL_PORT=3001
```

## Running

yarn:

```
yarn dev
```

NPM:

```
npm run dev
```

## Building

yarn:

```
yarn build
```

NPM:

```
npm run build
```

## Community

- [Discord](https://discord.gg/dRwGqHvE)

## Authors <a name = "authors"></a>

- [@michael616kriel](https://github.com/michael616kriel) - Idea & Initial work

See also the list of [contributors](https://github.com/michael616kriel/kult-graphql/contributors) who participated in this project.
