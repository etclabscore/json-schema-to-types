import TypescriptGenerator from "./typescript";
import { Schema } from "@open-rpc/meta-schema";

describe("codegen: typescript", () => {
  describe("booleans", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "boolean" });
      expect(generator.transpile()).toBe("export type Testerooskies = boolean;");
    });
  });

  describe("null", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "null" });
      expect(generator.transpile()).toBe("export type Testerooskies = null;");
    });
  });

  describe("number", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "number" });
      expect(generator.transpile()).toBe("export type Testerooskies = number;");
    });

    it("enums", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "number",
        enum: [1, 2, null],
      });
      expect(generator.transpile()).toBe("export type Testerooskies = 1 | 2;");
    });
  });

  describe("integer", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "integer" });
      expect(generator.transpile()).toBe("export type Testerooskies = number;");
    });

    it("enums", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "integer",
        enum: [1, 2, null],
      });
      expect(generator.transpile()).toBe("export type Testerooskies = 1 | 2;");
    });
  });

  describe("string", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "string" });
      expect(generator.transpile()).toBe("export type Testerooskies = string;");
    });

    it("enums", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "string",
        enum: ["foo", "bar", "baz", null],
      });
      expect(generator.transpile()).toBe("export type Testerooskies = \"foo\" | \"bar\" | \"baz\";");
    });
  });

  describe("array", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "array" });
      expect(generator.transpile()).toBe("export type Testerooskies = any[];");
    });

    it("ordered array", () => {
      const generator = new TypescriptGenerator({
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
        "export type Testerooskies = [Foo, Bar];",
        "export type Foo = string;",
        "export type Bar = string;",
      ].join("\n"));
    });

    it("unordered array", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "array",
        items: { $ref: "#/definitions/foo" },
        definitions: { foo: { title: "foo", type: "string" } },
      });
      expect(generator.transpile()).toBe([
        "export type Testerooskies = Foo[];",
        "export type Foo = string;",
      ].join("\n"));
    });
  });

  describe("object", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "object" });
      expect(generator.transpile()).toBe("export interface Testerooskies { [key: string]: any; }");
    });

    it.only("object with multiple keys", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "object",
        properties: {
          fooThing: { $ref: "#/definitions/foo" },
          barThing: { $ref: "#/definitions/bar" },
        },
        additionalProperties: {
          $ref: "#/definitions/kids",
        },
        required: ["fooThing"],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
          kids: {
            title: "kids",
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
      });
      expect(generator.transpile()).toBe([
        "export interface Testerooskies {",
        "  fooThing: Foo;",
        "  barThing?: Bar;",
        "  [k: string]: any;",
        "}",
        "export type Foo = string;",
        "export type Bar = string;",
      ].join("\n"));
    });
  });

  describe("anyOf", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({
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
        "export type AnyOfFoo = Foo | Bar;",
        "export type Foo = string;",
        "export type Bar = string;",
      ].join("\n"));
    });
  });

  describe("oneOf", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({
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
        "export type OneOfFoo = Foo | Bar;",
        "export type Foo = string;",
        "export type Bar = string;",
      ].join("\n"));
    });
  });

  describe("allOf", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({
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
        "export type AllOfFoo = Foo & Bar;",
        "export type Foo = string;",
        "export type Bar = string;",
      ].join("\n"));
    });
  });

  describe("any", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies" });
      expect(generator.transpile()).toBe("export type Testerooskies = any;");
    });
  });
});
