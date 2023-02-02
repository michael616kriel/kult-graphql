/// <reference types="lodash" />
import { Application, PluginBase } from '@kult/core';
export * from './lib/decorators';
export default class KultGraphql extends PluginBase {
    constructor(app: Application);
    init(): Promise<void>;
    getResolvers(): import("lodash").Dictionary<{
        [key: string]: any;
    } | {
        [key: string]: any;
    }> | undefined;
}
