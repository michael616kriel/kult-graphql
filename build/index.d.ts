/// <reference types="lodash" />
import { Application, PluginBase } from '@kult/core';
export * from './lib/decorators';
type GraphqlOptions = {
    schemas: string[];
    port: number;
    path: string;
};
export default class KultGraphql extends PluginBase {
    config: GraphqlOptions;
    constructor(app: Application);
    initialize(): Promise<void>;
    getResolvers(): import("lodash").Dictionary<{
        [key: string]: any;
    } | {
        [key: string]: any;
    }>;
}
