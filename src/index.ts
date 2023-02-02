import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  Application,
  getControllerMetadata,
  KultPlugin,
  PluginBase,
} from '@kult/core';
import { ApolloServer } from 'apollo-server-koa';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import http from 'http';
import { isEmpty, omitBy } from 'lodash';
import { join } from 'path';
import { getProjectRoot } from './utils/helpers';

export * from './lib/decorators';

@KultPlugin('Kult Graphql')
export default class KultGraphql extends PluginBase {
  constructor(app: Application) {
    super(app);
    this.init();
  }

  async init() {
    const server = this.app.server.server;
    const httpServer = http.createServer();
    const rootPath = getProjectRoot();
    const resolvers = this.getResolvers();
    const typeDefs = await readFileSync(
      join(rootPath, './schema.graphql')
    ).toString();
    const apolloServer = new ApolloServer({
      introspection: true,
      schema: makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: server, path: '/graphql' });
    httpServer.on('request', server.callback());

    httpServer.listen({ port: process.env.GRAPHQL_PORT }, () => {
      console.log(
        `${chalk.greenBright(
          chalk.bold('Graphql Server started:')
        )} ${chalk.white(
          `http://localhost:${process.env.GRAPHQL_PORT}${apolloServer.graphqlPath} 🚀`
        )}`
      );
    });
  }

  getResolvers() {
    const {
      app: {
        server: { controllers },
      },
    } = this;
    const resolvers: {
      Query: { [key: string]: any };
      Mutation: { [key: string]: any };
    } = {
      Query: {},
      Mutation: {},
    };
    for (const controller of controllers) {
      const graphqlMetadata = getControllerMetadata(controller.instance);
      const queries = graphqlMetadata.actions.map((action) =>
        action.middleware.find((middleware) => middleware.type === 'graphql')
      );
      for (const query of queries) {
        if (query) {
          const controllerAction = (parent: any, params: any) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return controller.instance[query.property](parent, params);
          };
          switch (query.method) {
            case 'QUERY':
              resolvers.Query[query.property] = controllerAction;
              break;
            case 'MUTATION':
              resolvers.Mutation[query.property] = controllerAction;
              break;
          }
        }
      }
      return omitBy(resolvers, isEmpty);
    }
  }
}
