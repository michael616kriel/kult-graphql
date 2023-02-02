"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = exports.Mutation = exports.Query = void 0;
const core_1 = require("@kult/core");
require("reflect-metadata");
const Query = () => {
    return (0, core_1.CoreHook)({ type: 'graphql', method: 'QUERY' });
};
exports.Query = Query;
const Mutation = () => {
    return (0, core_1.CoreHook)({ type: 'graphql', method: 'MUTATION' });
};
exports.Mutation = Mutation;
const Subscription = () => {
    return (0, core_1.CoreHook)({ type: 'graphql', method: 'SUBSCRIPTION' });
};
exports.Subscription = Subscription;
