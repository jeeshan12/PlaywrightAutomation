const { merge } = require('monocart-reporter');
const { readdirSync, readFileSync } = require('fs');
const { resolve, join } = require('path');

const getDirectories = (directoryPath) =>
	readdirSync(directoryPath, { withFileTypes: true })
		.reduce((acc, dir) => {
			dir.isDirectory() && acc.push(dir.name)
			return acc
		}, []);

const getReportDataList = (directoryPath) => {
	const directories = getDirectories(directoryPath);
	const reportsPath = [];
	for (const directory of directories) {
		const files = readdirSync(join(directoryPath, directory));
		for (const file of files) {
			if (file === 'index.json') {
				reportsPath.push(JSON.parse(readFileSync(join(directoryPath, directory, file)))
				);
			}
		}
	}
	return reportsPath;
}


(async () => {
	const reportDataList = getReportDataList(resolve(__dirname, '../results'));
	await merge(reportDataList, {
		name: 'Automation Execution Report',
		outputFile: `merged-report/index.html`,
		attachmentPath: (currentPath, extras) => {
		},
		onEnd: async (reportData, capability) => {
		}
	});

})();


