import * as fs from "fs";
import { promisify } from "util";
import { Schema } from "@open-rpc/meta-schema";
import JsonSchemaToTypes from "../index";
import { capitalize } from "../utils";

describe.only("Integration tests", () => {
  const testCaseDir = `${__dirname}/test-cases`;
  const testCaseFilenames: string[] = fs.readdirSync(testCaseDir);
  const testCases = testCaseFilenames.reduce((m, caseFilename) => ({
    ...m,
    [caseFilename.replace(".json", "")]: JSON.parse(fs.readFileSync(`${testCaseDir}/${caseFilename}`, "utf8")),
  }), {});

  const resultsDir = `${__dirname}/results`;
  const languages: string[] = fs.readdirSync(resultsDir);
  languages.forEach((lang) => {
    describe(lang, () => {
      Object.entries(testCases).forEach(([name, schema]: any) => {
        it(`test case ${name}`, () => {
          const result = fs.readFileSync(`${resultsDir}/${lang}/${name}.${lang}`, "utf8").trim();
          const transpiler = new JsonSchemaToTypes(schema) as any;
          expect(transpiler[`to${capitalize(lang)}`]()).toBe(result);
        });
      });
    });
  });
});
