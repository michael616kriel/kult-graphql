import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  Application,
  getControllerMetadata,
  loadConfig,
  Plugin,
  PluginBase,
} from '@kult/core';
import { ApolloServer } from 'apollo-server-koa';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import http from 'http';
import { isEmpty, omitBy } from 'lodash';
import {mergeTypeDefs} from '@graphql-tools/merge'
export * from './lib/decorators';

type GraphqlOptions = {
  schemas: string[];
  port: number;
  path: string
};

@Plugin({
  name: 'Kult Graphql',
})
export default class KultGraphql extends PluginBase {

  config: GraphqlOptions;

  constructor(app: Application) {
    super(app);
  }

  async initialize() {
    const server = this.app.server.server;
    const httpServer = http.createServer();
    this.config = await loadConfig<GraphqlOptions>('graphql');
    const resolvers = this.getResolvers();
    const typeDefs = this.config.schemas.join('\n');

    const apolloServer = new ApolloServer({
      introspection: true,
      schema: makeExecutableSchema({
        typeDefs: mergeTypeDefs(typeDefs),
        resolvers,
      }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: server, path: this.config.path });
    httpServer.on('request', server.callback());

    httpServer.listen({ port: this.config.port }, () => {
      console.log(
        `${chalk.greenBright(
          chalk.bold('Graphql Server started:')
        )} ${chalk.white(
          `http://localhost:${this.config.port}${apolloServer.graphqlPath} 🚀`
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

    for (let index = 0; index < controllers.length; index++) {
      const controller = controllers[index];
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
    }
    return omitBy(resolvers, isEmpty);
  }
}
