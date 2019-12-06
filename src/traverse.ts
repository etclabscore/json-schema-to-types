import { Schema } from "@open-rpc/meta-schema";

/**
 * Signature of the mutation method passed to traverse.
 */
export type MutationFunction = (schema: Schema) => Schema;

/**
 * The options you can use when traversing.
 */
export interface TraverseOptions {
  /**
   * Set this to true if you don't want to call the mutator function on the root schema.
   */
  skipFirstMutation: boolean;
}

export const defaultOptions: TraverseOptions = {
  skipFirstMutation: false,
};

/**
 * Traverse all subschema of a schema, calling the mutator function with each.
 * The mutator is called on leaf nodes first.
 *
 * @param schema the schema to traverse
 * @param mutation the function to pass each node in the subschema tree.
 * @param traverseOptions a set of options for traversal.
 * @param depth For internal use. Tracks the current recursive depth in the tree. This is used to implement
 *              some of the options.
 *
 */
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
    if (schema.items instanceof Array) {
      mutableSchema.items = schema.items.map(rec);
    } else {
      mutableSchema.items = traverse(schema.items, mutation);
    }
  } else if (schema.properties) {
    mutableSchema.properties = Object.keys(schema.properties)
      .reduce(
        (r: Schema, v: string) => ({ ...r, ...{ [v]: rec(schema.properties[v]) } }),
        {},
      );
  } else if (schema.additionalProperties) {
    if (schema.additionalProperties !== true) {
      mutableSchema.additionalProperties = traverse(schema.additionalProperties, mutation);
    }
  }
  additionalProperties: {
    type: "array"
    items: {

    }
  }

  if (traverseOptions.skipFirstMutation === true && depth === 0) {
    return mutableSchema;
  } else {
    return mutation(mutableSchema);
  }
}
