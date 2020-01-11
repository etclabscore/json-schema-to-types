import * as fs from "fs";
import { Schema } from "@open-rpc/meta-schema";
import JsonSchemaToTypes from "../index";
import { capitalize } from "../utils";
import refParser from "json-schema-ref-parser";

describe("Integration tests", () => {
  let testCases: { [key: string]: Schema };
  beforeAll(() => {
    const testCaseDir = `${__dirname}/test-cases`;
    const testCaseFilenames: string[] = fs.readdirSync(testCaseDir);
    testCases = testCaseFilenames
      .reduce((m, caseFilename) => ({
        ...m,
        [caseFilename.replace(".json", "")]: refParser.dereference(
          JSON.parse(fs.readFileSync(`${testCaseDir}/${caseFilename}`, "utf8")),
        ),
      }), {});
    return Promise.all(Object.entries(testCases).map(([n, promise]) => promise));
  });

  const resultsDir = `${__dirname}/results`;
  const languages: string[] = fs.readdirSync(resultsDir);

  it("checks out", async () => {
    const entries = Object.entries(testCases);
    expect.assertions(entries.length * languages.length);

    languages.forEach((lang) => {
      entries.forEach(async ([name, schema]: any) => {
        const result = fs.readFileSync(`${resultsDir}/${lang}/${name}.${lang}`, "utf8").trim();
        const transpiler = new JsonSchemaToTypes(await schema);
        expect(transpiler[`to${capitalize(lang)}`]()).toBe(result);
      });
    });
  });
});
