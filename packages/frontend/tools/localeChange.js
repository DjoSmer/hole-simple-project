const fs = require('fs');
const path = require('path');
const _ = require('lodash');

if (process.argv.length < 2) {
    console.log('Translation change - not found file');
}

/** @var string */
const translationFile = process.argv[2] || '';

console.log('Translation change - ' + translationFile);

const rootDir = path.join(__dirname, '../');
const outputDir = path.join(__dirname, '../public/locales/');

const partsPath = translationFile.split('/');
const language = path.basename(translationFile, '.json');
let ns = partsPath[partsPath.indexOf('locales') - 1] || 'translation';
ns = ns === 'src' ? 'translation' : ns;
const translation = require(path.join(rootDir, translationFile));

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

let languageDir = path.join(outputDir, language);
if (!fs.existsSync(languageDir)) {
    fs.mkdirSync(languageDir);
}

const indexModules = partsPath.findIndex((dirName) => dirName === 'modules');
if (indexModules !== -1) {
    const module = _.camelCase(partsPath[indexModules + 1]);
    languageDir = path.join(languageDir, module);
    if (!fs.existsSync(languageDir)) {
        fs.mkdirSync(languageDir);
    }
}

const filename = _.camelCase(ns) + '.json';
fs.writeFileSync(path.join(languageDir, filename), JSON.stringify(translation));

console.log('Translation change - end.');
