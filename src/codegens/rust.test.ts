import RustGenerator from "./rust";
import { Schema } from "@open-rpc/meta-schema";

describe("codegen: rust", () => {

  it("implements getCodePrefix", () => {
    const generator = new RustGenerator({ title: "testerooskies", type: "boolean" });
    expect(generator.getCodePrefix()).toBe("extern crate serde_json;");
  });

  describe("booleans", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "boolean" });
      expect(generator.transpile()).toBe("pub type Testerooskies = bool;");
    });
  });

  describe("null", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "null" });
      expect(generator.transpile()).toBe("pub type Testerooskies = serde_json::Value;");
    });
  });

  describe("number", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "number" });
      expect(generator.transpile()).toBe("pub type Testerooskies = f64;");
    });

    it("enums on numbers do nothing special right now", () => {
      const generator = new RustGenerator({
        title: "testerooskies",
        type: "number",
        enum: [1, 2, null],
      });

      expect(generator.transpile()).toBe("pub type Testerooskies = f64;");
    });
  });

  describe("integer", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "integer" });
      expect(generator.transpile()).toBe("pub type Testerooskies = i64;");
    });

    it("enums on integers do nothing special right now", () => {
      const generator = new RustGenerator({
        title: "testerooskies",
        type: "integer",
        enum: [1, 2, null],
      });
      expect(generator.transpile()).toBe("pub type Testerooskies = i64;");
    });
  });

  describe("string", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "string" });
      expect(generator.transpile()).toBe("pub type Testerooskies = String;");
    });

    it("enums", () => {
      const generator = new RustGenerator({
        title: "testerooskies",
        type: "string",
        enum: ["foo", "bar", "baz", null],
      });
      expect(generator.transpile()).toBe([
        "#[derive(Serialize, Deserialize)]",
        "pub enum Testerooskies {",
        "    #[serde(rename = foo)]",
        "    Foo,",
        "    #[serde(rename = bar)]",
        "    Bar,",
        "    #[serde(rename = baz)]",
        "    Baz,",
        "}",
      ].join("\n"));
    });
  });

  describe("array", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "array" });
      expect(generator.transpile()).toBe("pub type Testerooskies = Vec<serde_json::Value>;");
    });

    it("ordered array", () => {
      const generator = new RustGenerator({
        title: "testerooskies",
        type: "array",
        items: [
          { $ref: "#/definitions/foo" },
          { $ref: "#/definitions/bar" },
        ],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.transpile()).toBe([
        "pub type Testerooskies = (Foo, Bar);",
        "pub type Foo = String;",
        "pub type Bar = String;",
      ].join("\n"));
    });

    it("unordered array", () => {
      const generator = new RustGenerator({
        title: "testerooskies",
        type: "array",
        items: { $ref: "#/definitions/foo" },
        definitions: { foo: { title: "foo", type: "string" } },
      });
      expect(generator.transpile()).toBe([
        "pub type Testerooskies = Vec<Foo>;",
        "pub type Foo = String;",
      ].join("\n"));
    });
  });

  describe("object", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies", type: "object" });
      expect(generator.transpile()).toBe("pub type Testerooskies = HashMap<String, Option<serde_json::Value>>;");
    });

    it("object with multiple keys", () => {
      const generator = new RustGenerator({
        title: "testerooskies",
        type: "object",
        properties: {
          fooThing: { $ref: "#/definitions/foo" },
          barThing: { $ref: "#/definitions/bar" },
        },
        required: ["fooThing"],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.transpile()).toBe([
        "#[derive(Serialize, Deserialize)]",
        "pub struct Testerooskies {",
        "    pub(crate) fooThing: Foo,",
        "    pub(crate) barThing: Option<Bar>,",
        "}",
        "pub type Foo = String;",
        "pub type Bar = String;",
      ].join("\n"));
    });
  });

  describe("anyOf", () => {
    it("base case", () => {
      const generator = new RustGenerator({
        title: "anyOfFoo",
        anyOf: [
          { $ref: "#/definitions/foo" },
          { $ref: "#/definitions/bar" },
        ],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.transpile()).toBe([
        "#[derive(Serialize, Deserialize)]",
        "pub enum AnyOfFoo {",
        "    Foo,",
        "    Bar",
        "}",
        "pub type Foo = String;",
        "pub type Bar = String;",
      ].join("\n"));
    });
  });

  describe("oneOf", () => {
    it("base case", () => {
      const generator = new RustGenerator({
        title: "oneOfFoo",
        oneOf: [
          { $ref: "#/definitions/foo" },
          { $ref: "#/definitions/bar" },
        ],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.transpile()).toBe([
        "#[derive(Serialize, Deserialize)]",
        "pub enum OneOfFoo {",
        "    Foo,",
        "    Bar",
        "}",
        "pub type Foo = String;",
        "pub type Bar = String;",
      ].join("\n"));
    });
  });

  describe("allOf", () => {
    it("base case", () => {
      const generator = new RustGenerator({
        title: "allOfFoo",
        allOf: [
          { $ref: "#/definitions/foo" },
          { $ref: "#/definitions/bar" },
        ],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.transpile()).toBe([
        "pub type AllOfFoo = HashMap<String, Option<serde_json::Value>>;",
        "pub type Foo = String;",
        "pub type Bar = String;",
      ].join("\n"));
    });
  });

  describe("any", () => {
    it("base case", () => {
      const generator = new RustGenerator({ title: "testerooskies" });
      expect(generator.transpile()).toBe("pub type Testerooskies = serde_json::Value;");
    });
  });
});
