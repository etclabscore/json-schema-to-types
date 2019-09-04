import { Schema } from "@open-rpc/meta-schema";

export class JsonSchemaToTypes {

  constructor(s: Schema) {
    // 1. apply title where title is missing. Use content hash
    // 2. collect and ref all sub schemas
    // 3. unique schemas
    // 4.
  }

  private ensureSchemaTitles(s: Schema) {
    const newS: Schema = { ...s };

    if (s.anyOf) { newS.anyOf = s.anyOf.map(ensureSchemaTitles); }
    if (s.allOf) { newS.allOf = s.allOf.map(ensureSchemaTitles); }
    if (s.oneOf) { newS.oneOf = s.oneOf.map(ensureSchemaTitles); }
    if (s.items) {
      if (s.items instanceof Array) {
        newS.items = s.items.map(ensureSchemaTitles);
      } else {
        newS.items = ensureSchemaTitles(s.items);
      }
    }
    if (s.properties) { newS.properties = _.mapValues(s.properties, ensureSchemaTitles); }

    if (s.title === undefined) {
      newS.title = getDefaultTitleForSchema(s);
    }

    return newS;
  }
}

export default JsonSchemaToTypes;
