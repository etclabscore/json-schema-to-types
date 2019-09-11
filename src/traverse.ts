import { Schema } from "@open-rpc/meta-schema";

export type MutationFunction = (schema: Schema) => Schema;

export default function traverse(schema: Schema, mutation: MutationFunction) {
  const mutatableSchema: Schema = { ...schema };

  const rec = (s: Schema) => traverse(s, mutation);

  if (schema.anyOf) {
    mutatableSchema.anyOf = schema.anyOf.map(rec);
  } else if (schema.allOf) {
    mutatableSchema.allOf = schema.allOf.map(rec);
  } else if (schema.oneOf) {
    mutatableSchema.oneOf = schema.oneOf.map(rec);
  } else if (schema.items) {
    mutatableSchema.items = schema.items instanceof Array ? schema.items.map(rec) : traverse(schema.items, mutation);
  } else if (schema.properties) {
    mutatableSchema.properties = Object.keys(schema.properties)
      .reduce(
        (r: Schema, v: string) => ({ ...r, ...{ [v]: rec(schema.properties[v]) } }),
        {},
      );
  }

  return mutation(mutatableSchema);
}
