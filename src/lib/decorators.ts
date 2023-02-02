import { CoreHook } from '@kult/core';
import 'reflect-metadata';

export type GrapqhlQueryMetaType = {
  action: string;
  type: string;
};

export const Query = () => {
  return CoreHook({ type: 'graphql', method: 'QUERY' });
};
export const Mutation = () => {
  return CoreHook({ type: 'graphql', method: 'MUTATION' });
};
export const Subscription = () => {
  return CoreHook({ type: 'graphql', method: 'SUBSCRIPTION' });
};
