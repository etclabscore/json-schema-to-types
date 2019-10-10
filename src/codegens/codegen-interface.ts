import { Schema } from "@open-rpc/meta-schema";

export interface CodeGen {
  getTypes: (schema: Schema) => string;
}
