const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const appPackage = require('../package.json');

console.log('Translation build - start.');
const rootDir = path.join(__dirname, '../src');
const outputDir = path.join(__dirname, '../public/locales/');
const nodeModules = path.join(__dirname, '../node_modules/');

const getFiles = function (dir, regExp = /^\.\/.*$/) {
    const outputFiles = [];
    const files = fs.readdirSync(dir);
    for (let i in files) {
        const name = path.join(dir, files[i]);
        if (fs.statSync(name).isDirectory()) {
            outputFiles.push(...getFiles(name, regExp));
        } else if (name.match(regExp)) {
            outputFiles.push(name);
        }
    }
    return outputFiles;
};

const translations = {};
const translationFiles = getFiles(rootDir, /locales.*\.json$/);

for (let i in translationFiles) {
    const translationFile = translationFiles[i];
    const partsPath = translationFile.split('/');
    const language = path.basename(translationFile, '.json');
    let ns = partsPath[partsPath.indexOf('locales') - 1] || 'translation';
    const indexModules = partsPath.findIndex((dirName) => dirName === 'modules');
    ns =
        ns === 'src'
            ? 'translation'
            : indexModules !== -1
            ? `${ns}.${partsPath[indexModules + 1]}`
            : ns;
    const translation = require(translationFile);
    if (!translations[language]) translations[language] = {};
    translations[language][ns] = _.merge(translations[language][ns] || {}, translation);
}

if (appPackage.localeDependencies) {
    appPackage.localeDependencies.forEach((localeDependency) => {
        getFiles(nodeModules + localeDependency + '/locales', /\.json$/).forEach(
            (fileLocalePackage) => {
                const language = path.basename(fileLocalePackage, '.json');
                const localePackage = require(fileLocalePackage);
                Object.entries(localePackage).forEach(([ns, translation]) => {
                    translations[language][ns] = _.merge(
                        translations[language][ns] || {},
                        translation
                    );
                });
            }
        );
    });
}

if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, {recursive: true});
}

fs.mkdirSync(outputDir);

//loadPath: '/locales/{{lng}}/{{module}}/{{ns}}.json',
Object.entries(translations).forEach(([language, translations]) => {
    const languageDir = path.join(outputDir, language);
    if (!fs.existsSync(languageDir)) {
        fs.mkdirSync(languageDir);
    }

    Object.entries(translations).forEach(([rawNs, translations]) => {
        const [ns, module = ''] = rawNs.split('.');
        let nsDir = path.join(languageDir, _.camelCase(module));
        if (!fs.existsSync(nsDir)) {
            fs.mkdirSync(nsDir);
        }
        const filename = _.camelCase(ns) + '.json';
        fs.writeFileSync(path.join(nsDir, filename), JSON.stringify(translations));
    });
});

console.log('Translation build - end.');
