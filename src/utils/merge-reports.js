import { merge } from "monocart-reporter";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getDirectories = (directoryPath) =>
  readdirSync(directoryPath, { withFileTypes: true }).reduce((acc, dir) => {
    dir.isDirectory() && acc.push(dir.name);
    return acc;
  }, []);

const getReportDataList = (directoryPath) => {
  const directories = getDirectories(directoryPath);
  const reportsPath = [];
  for (const directory of directories) {
    const files = readdirSync(join(directoryPath, directory));
    for (const file of files) {
      if (file === "index.json") {
        reportsPath.push(
          JSON.parse(readFileSync(join(directoryPath, directory, file))),
        );
      }
    }
  }
  return reportsPath;
};

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const reportDataList = getReportDataList(resolve(__dirname, "../../results"));
  await merge(reportDataList, {
    name: "Automation Execution Report",
    outputFile: "../../merged-report/index.html",
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    attachmentPath: (currentPath, extras) => {},
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    onEnd: async (reportData, capability) => {},
  });
})();
