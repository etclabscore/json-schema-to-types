import * as fs from "fs";
import { promisify } from "util";

const [readDir] = [promisify(fs.readdir)];

const cwd = `${process.cwd()}/src/integration-tests`;
const resultsDir = `${cwd}/results`;
const testCaseDir = `${cwd}/test-cases`;

export const getAvailableLanguages = (): Promise<any> => {
  return readDir(resultsDir);
};

export const getTestCasesNames = async (): Promise<string[]> => {
  const testCaseNames = await readDir(testCaseDir);
  return testCaseNames.map((n) => n.replace(".json", ""));
};
