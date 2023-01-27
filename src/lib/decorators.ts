import { ControllerBase } from '@kult/core';
import 'reflect-metadata';

export const GRAPHQL_ACTION_META_KEY = Symbol('graphql:action');

const actionMethod = (type: string) => {
  return () => {
    return (target: any, propertyKey: string) => {
      const actions =
        Reflect.getOwnMetadata(GRAPHQL_ACTION_META_KEY, target) || [];
      actions.push({
        action: propertyKey,
        type,
      });
      return Reflect.defineMetadata(GRAPHQL_ACTION_META_KEY, actions, target);
    };
  };
};

export type GrapqhlQueryMetaType = {
  action: string;
  type: string;
};

export const getControllerMetadata = (
  target: ControllerBase
): GrapqhlQueryMetaType[] => {
  const actionMeta = Reflect.getMetadata(GRAPHQL_ACTION_META_KEY, target);
  return actionMeta as GrapqhlQueryMetaType[];
};

export const Query = actionMethod('QUERY');
export const Mutation = actionMethod('MUTATION');
export const Subscription = actionMethod('SUBSCRIPTION');
