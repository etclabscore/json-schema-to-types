import TypescriptGenerator from "./typescript";
import { Schema } from "@open-rpc/meta-schema";

describe("codegen: typescript", () => {
  describe("booleans", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "boolean" });
      expect(generator.getTypes()).toBe("export type testerooskies = boolean;");
    });
  });

  describe("null", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "null" });
      expect(generator.getTypes()).toBe("export type testerooskies = null;");
    });
  });

  describe("number", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "number" });
      expect(generator.getTypes()).toBe("export type testerooskies = number;");
    });

    it("enums", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "number",
        enum: [1, 2, null],
      });
      expect(generator.getTypes()).toBe("export type testerooskies = 1 | 2;");
    });
  });

  describe("integer", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "number" });
      expect(generator.getTypes()).toBe("export type testerooskies = number;");
    });

    it("enums", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "integer",
        enum: [1, 2, null],
      });
      expect(generator.getTypes()).toBe("export type testerooskies = 1 | 2;");
    });
  });

  describe("string", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "string" });
      expect(generator.getTypes()).toBe("export type testerooskies = string;");
    });

    it("enums", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "string",
        enum: ["foo", "bar", "baz", null],
      });
      expect(generator.getTypes()).toBe("export type testerooskies = \"foo\" | \"bar\" | \"baz\";");
    });
  });

  describe("array", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "array" });
      expect(generator.getTypes()).toBe("export type testerooskies = any[];");
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
      expect(generator.getTypes()).toBe("export type testerooskies = [foo, bar];");
    });

    it("unordered array", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "array",
        items: { $ref: "#/definitions/foo" },
        definitions: { foo: { title: "foo", type: "string" } },
      });
      expect(generator.getTypes()).toBe("export type testerooskies = foo[];");
    });
  });

  describe("object", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies", type: "object" });
      expect(generator.getTypes()).toBe("export interface testerooskies { [key: string]: any }");
    });

    it("object with multiple keys", () => {
      const generator = new TypescriptGenerator({
        title: "testerooskies",
        type: "object",
        properties: {
          fooThing: { $ref: "#/definitions/foo" },
          barThing: { $ref: "#/definitions/bar" },
        },
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.getTypes()).toBe([
        "export interface testerooskies {",
        "  fooThing: foo;",
        "  barThing: bar;",
        "}",
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
      expect(generator.getTypes()).toBe("export type anyOfFoo = foo | bar;");
    });
  });

  describe("oneOf", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({
        title: "anyOfFoo",
        oneOf: [
          { $ref: "#/definitions/foo" },
          { $ref: "#/definitions/bar" },
        ],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.getTypes()).toBe("export type anyOfFoo = foo | bar;");
    });
  });

  describe("allOf", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({
        title: "anyOfFoo",
        allOf: [
          { $ref: "#/definitions/foo" },
          { $ref: "#/definitions/bar" },
        ],
        definitions: {
          foo: { title: "foo", type: "string" },
          bar: { title: "bar", type: "string" },
        },
      });
      expect(generator.getTypes()).toBe("export type anyOfFoo = foo & bar;");
    });
  });

  describe("any", () => {
    it("base case", () => {
      const generator = new TypescriptGenerator({ title: "testerooskies" });
      expect(generator.getTypes()).toBe("export type testerooskies = any;");
    });
  });
});
