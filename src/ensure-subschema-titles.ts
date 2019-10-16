import { Schema } from "@open-rpc/meta-schema";

export class NoTitleError extends Error {
  constructor(schema: Schema, subSchemaKey: string, subschema: Schema) {
    super([
      "Title is required on subschemas.",
      "Without title, identical schemas would return differing names.",
      "",
      "Schema in question:",
      JSON.stringify(schema),
      "",
      "Key containing problematic subschema:",
      subSchemaKey,
      "",
      "offending subschema:",
      JSON.stringify(subschema),
    ].join("\n"));
  }
}

export const ensureSubschemaTitles = (s: Schema): NoTitleError[] => {
  const errors = [];

  ["anyOf", "oneOf", "allOf"].forEach((k) => {
    if (!s[k]) { return; }
    s[k].forEach((ss: Schema, i: number) => {
      if (ss.title === undefined) { errors.push(new NoTitleError(s, `${k}[${i}]`, ss)); }
    });
  });

  if (s.items) {
    if (s.items instanceof Array) {
      s.items.forEach((ss: Schema, i) => {
        if (ss.title === undefined) { errors.push(new NoTitleError(s, "items[i]", ss)); }
      });
    } else {
      if (s.items.title === undefined) { errors.push(new NoTitleError(s, "items", s.items)); }
    }
  }

  if (s.properties) {
    const propVals = Object.entries(s.properties) as Array<[string, Schema]>;
    propVals.forEach(([key, ss]: [string, Schema]) => {
      if (ss.title === undefined) { errors.push(new NoTitleError(s, `properties.${key}`, ss)); }
    });
  }

  return errors;
};
