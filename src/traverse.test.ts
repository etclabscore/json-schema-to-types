import traverse from "./traverse";
import { Schema } from "@open-rpc/meta-schema";

describe("traverse", () => {
  it("it calls mutate only once when there are no subschemas", () => {
    const testSchema = {};
    const mockMutation = jest.fn((s) => s);

    traverse(testSchema, mockMutation);

    expect(mockMutation).toHaveBeenCalledTimes(1);
  });

  describe("basic functionality", () => {
    const test = (prop: string, useVal = false) => {
      const a = {};
      const b = {};
      const testSchema: any = {};
      testSchema[prop] = useVal === false ? [a, b] : useVal;
      const mockMutation = jest.fn((mockS) => mockS);

      traverse(testSchema, mockMutation);

      expect(mockMutation).toHaveBeenCalledWith(a);
      if (useVal) { expect(mockMutation).toHaveBeenCalledWith(useVal); }
    };

    ["anyOf", "oneOf", "allOf"].forEach((prop) => {
      it(`traverses ${prop}`, () => test(prop));
    });

    it("traverses items when items is ordered list", () => test("items"));
    it("traverses items when items constrained to single schema", () => test("items", false));
    it("traverses properties", () => {
      const testSchema: any = {
        properties: {
          a: {},
          b: {},
        },
      };
      const mockMutation = jest.fn((mockS) => mockS);

      traverse(testSchema, mockMutation);

      expect(mockMutation).toHaveBeenCalledWith(testSchema.properties.a);
      expect(mockMutation).toHaveBeenCalledWith(testSchema.properties.b);
      expect(mockMutation).toHaveBeenCalledWith(testSchema);
      expect(mockMutation).toHaveBeenCalledTimes(3);
    });
  });
});
