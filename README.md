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

```bash label="bash"
yarn add @kult/graphql
```

NPM:

```bash label="bash"
npm i @kult/graphql
```

## Usage

Create a `schema.graphql` in your `src` directory:

```typescript label="./src/app/config/plugins.ts"
type Query {
  hello: String
}

type Mutation {
  sayHello: String
}
```

Register the plugin in `./src/app/config/plugins.ts`

```typescript label="./src/app/config/plugins.ts"
import KultGraphqlPlugin from '@kult/graphql';

export default {
  plugins: [KultGraphqlPlugin],
};
```

Define your queries and mutations using the `@Query` and `@Mutation` decorators:

```typescript label="./src/app/config/plugins.ts"
import { Application, ControllerBase, Controller } from '@kult/core';
import { Mutation, Query } from '@kult/graphql';

@Controller('/users')
class UserController extends ControllerBase {
  constructor(app: Application) {
    super(app);
  }

  @Query()
  hello() {
    return 'hello world';
  }

  @Mutation()
  sayHello() {
    return 'hello world';
  }
}

export default UserController;
```

### Environment Variables

Ensure this port is different than your server's port

```bash label=".env"
GRAPHQL_PORT=3001
```
## Community

- [Discord](https://discord.gg/dRwGqHvE)

## Authors <a name = "authors"></a>

- [@michael616kriel](https://github.com/michael616kriel) - Idea & Initial work

See also the list of [contributors](https://github.com/michael616kriel/kult-graphql/contributors) who participated in this project.
