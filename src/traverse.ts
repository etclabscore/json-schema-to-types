import { Schema } from "@open-rpc/meta-schema";

export type MutationFunction = (schema: Schema) => Schema;
export interface TraverseOptions {
  skipFirstMutation: boolean;
}

export const defaultOptions: TraverseOptions = {
  skipFirstMutation: false,
};

export default function traverse(
  schema: Schema,
  mutation: MutationFunction,
  traverseOptions = defaultOptions,
  depth = 0,
) {
  const mutableSchema: Schema = { ...schema };

  const rec = (s: Schema) => traverse(s, mutation, traverseOptions, depth + 1);

  if (schema.anyOf) {
    mutableSchema.anyOf = schema.anyOf.map(rec);
  } else if (schema.allOf) {
    mutableSchema.allOf = schema.allOf.map(rec);
  } else if (schema.oneOf) {
    mutableSchema.oneOf = schema.oneOf.map(rec);
  } else if (schema.items) {
    mutableSchema.items = schema.items instanceof Array ? schema.items.map(rec) : traverse(schema.items, mutation);
  } else if (schema.properties) {
    mutableSchema.properties = Object.keys(schema.properties)
      .reduce(
        (r: Schema, v: string) => ({ ...r, ...{ [v]: rec(schema.properties[v]) } }),
        {},
      );
  }

  if (traverseOptions.skipFirstMutation === true && depth === 0) {
    return mutableSchema;
  } else {
    return mutation(mutableSchema);
  }
}
