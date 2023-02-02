import 'reflect-metadata';
export type GrapqhlQueryMetaType = {
    action: string;
    type: string;
};
export declare const Query: () => (target: Object, property: string) => void;
export declare const Mutation: () => (target: Object, property: string) => void;
export declare const Subscription: () => (target: Object, property: string) => void;
