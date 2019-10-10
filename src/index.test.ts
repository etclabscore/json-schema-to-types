import JsonSchemaToTypes, { NoTitleError } from "./index";

describe("JsonSchemaToTypes", () => {

  describe("getDefaultTitleForSchema", () => {
    const transpiler = new JsonSchemaToTypes({});

    it("does not change anything if theres already a title", () => {
      const testSchema = { title: "foo" };
      const result = transpiler.getDefaultTitleForSchema(testSchema);
      expect(result).toBe(testSchema);
    });

    describe("subschemas must have titles themselves", () => {
      it("anyOf", () => {
        expect(() => transpiler.getDefaultTitleForSchema({
          anyOf: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("allOf", () => {
        expect(() => transpiler.getDefaultTitleForSchema({
          allOf: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("oneOf", () => {
        expect(() => transpiler.getDefaultTitleForSchema({
          oneOf: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("items", () => {
        expect(() => transpiler.getDefaultTitleForSchema({
          items: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("properties", () => {
        expect(() => transpiler.getDefaultTitleForSchema({
          properties: { a: { title: "abc" }, b: {} },
        })).toThrow(NoTitleError);
      });
    });

    describe("different schema yields different name", () => {

      it("type", () => {
        expect(transpiler.getDefaultTitleForSchema({ type: "string" }))
          .not
          .toEqual(transpiler.getDefaultTitleForSchema({ type: "number" }));
      });

      it("additional properties such as minimum", () => {
        expect(transpiler.getDefaultTitleForSchema({ type: "number" }))
          .not
          .toEqual(transpiler.getDefaultTitleForSchema({ type: "number", minimum: 3 }));
      });

      it("different titles same everything else", () => {
        expect(transpiler.getDefaultTitleForSchema({ type: "number", title: "b" }))
          .not
          .toEqual(transpiler.getDefaultTitleForSchema({ type: "number", title: "a" }));
      });

      it("when items is an array, order matters", () => {
        const a = { title: "a" };
        const b = { title: "b" };

        const t1 = { type: "array", items: [a, b] };
        const t2 = { type: "array", items: [b, a] };

        expect(transpiler.getDefaultTitleForSchema(t1))
          .not
          .toEqual(transpiler.getDefaultTitleForSchema(t2));
      });
    });

    describe("same schema yields same name", () => {

      it("anyOf, oneOf and allOf order does not matter", () => {
        const a = { title: "foo" };
        const b = { title: "bar" };

        ["anyOf", "oneOf", "allOf"].forEach((k) => {
          const t1 = { [k]: [a, b] };
          const t2 = { [k]: [b, a] };
          expect(transpiler.getDefaultTitleForSchema(t1))
            .toEqual(transpiler.getDefaultTitleForSchema(t2));
        });
      });

      it("object properties ordering does not matter", () => {
        const a = { title: "foo" };
        const b = { title: "bar" };

        const t1 = { type: "object", properties: { a, b } };
        const t2 = { type: "object", properties: { b, a } };

        expect(transpiler.getDefaultTitleForSchema(t1))
          .toEqual(transpiler.getDefaultTitleForSchema(t2));
      });

      it("when array is an object (single schema), property ordering does not matter", () => {
        const a = { type: "integer", title: "foo" };
        const b = { title: "foo", type: "integer" };

        const t1 = { type: "array", items: a };
        const t2 = { type: "array", items: b };

        expect(transpiler.getDefaultTitleForSchema(t1))
          .toEqual(transpiler.getDefaultTitleForSchema(t2));
      });

      it("order of enum values doesnt matter", () => {
        const a = { type: "number", enum: [1, 2, 3] };
        const b = { type: "number", enum: [3, 2, 1] };

        expect(transpiler.getDefaultTitleForSchema(a))
          .toEqual(transpiler.getDefaultTitleForSchema(b));
      });

      it("definitions are ignored", () => {
        const a = { type: "number", definitions: { a: { type: "number" } } };
        const b = { type: "number", definitions: { b: { type: "string" } } };

        expect(transpiler.getDefaultTitleForSchema(a).title)
          .toEqual(transpiler.getDefaultTitleForSchema(b).title);
      });
    });
  });
});
