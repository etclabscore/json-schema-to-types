# JSON-Schema-To-Types

This is a JSON-Schema transpiler. It converts a JSON Schema into types for various strongly typed languages.

Features:

 - Supports the following languages:
   - Typescript
   - Rust
 - Zero external dependencies
 - Supports merging multiple JSONSchema into one set of types
 - Generates titles for schemas that are missing them
 - Run in browser / node

## Installing

```
npm install --save @etclabscore/typings
```

## Usage

```javascript
const schema = {
  title: "testerooskies",
  type: "object",
  properties: {
    fooThing: { title: "foo", type: "string" },
    barThing: { title: "bar", type: "number" },
  },
};
const transpiler = new JsonSchemaToTypes(schema);

console.log(transpiler.toRust())
/** outputs:
"#[derive(Serialize, Deserialize)]
pub struct testerooskies {
    pub(crate) fooThing: foo,
    pub(crate) barThing: bar,
**
pub type foo = String;
pub type bar = String;"
**/

console.log(transpiler.toTypescript());
/**outputs
"export interface testerooskies {
  fooThing: foo;
  barThing: bar;
}
export type foo = string;
export type bar = string;"
**/

```

### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
