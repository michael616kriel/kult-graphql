"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const core_1 = require("@kult/core");
const apollo_server_koa_1 = require("apollo-server-koa");
const chalk_1 = __importDefault(require("chalk"));
const http_1 = __importDefault(require("http"));
const lodash_1 = require("lodash");
const merge_1 = require("@graphql-tools/merge");
__exportStar(require("./lib/decorators"), exports);
let KultGraphql = class KultGraphql extends core_1.PluginBase {
    constructor(app) {
        super(app);
    }
    async initialize() {
        const server = this.app.server.server;
        const httpServer = http_1.default.createServer();
        this.config = await (0, core_1.loadConfig)('graphql');
        const resolvers = this.getResolvers();
        const typeDefs = this.config.schemas.join('\n');
        const apolloServer = new apollo_server_koa_1.ApolloServer({
            introspection: true,
            schema: (0, schema_1.makeExecutableSchema)({
                typeDefs: (0, merge_1.mergeTypeDefs)(typeDefs),
                resolvers,
            }),
        });
        await apolloServer.start();
        apolloServer.applyMiddleware({ app: server, path: this.config.path });
        httpServer.on('request', server.callback());
        httpServer.listen({ port: this.config.port }, () => {
            console.log(`${chalk_1.default.greenBright(chalk_1.default.bold('Graphql Server started:'))} ${chalk_1.default.white(`http://localhost:${this.config.port}${apolloServer.graphqlPath} 🚀`)}`);
        });
    }
    getResolvers() {
        const { app: { server: { controllers }, }, } = this;
        const resolvers = {
            Query: {},
            Mutation: {},
        };
        for (let index = 0; index < controllers.length; index++) {
            const controller = controllers[index];
            const graphqlMetadata = (0, core_1.getControllerMetadata)(controller.instance);
            const queries = graphqlMetadata.actions.map((action) => action.middleware.find((middleware) => middleware.type === 'graphql'));
            for (const query of queries) {
                if (query) {
                    const controllerAction = (parent, params) => {
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
        return (0, lodash_1.omitBy)(resolvers, lodash_1.isEmpty);
    }
};
KultGraphql = __decorate([
    (0, core_1.Plugin)({
        name: 'Kult Graphql',
    }),
    __metadata("design:paramtypes", [core_1.Application])
], KultGraphql);
exports.default = KultGraphql;
