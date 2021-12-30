const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');

const rootPath = path.join(__dirname, '../');
const distPath = path.join(rootPath, 'dist');

async function run() {
	await new Promise(resolve => exec('npx tsc', resolve));
	await fs.copyFile(
		path.join(rootPath, 'package.json'),
		path.join(distPath, 'package.json')
	);
	await fs.copyFile(path.join(rootPath, 'readme.md'), path.join(distPath, 'readme.md'));
	await fs.copyFile(path.join(rootPath, 'licence'), path.join(distPath, 'licence'));
}

run();
