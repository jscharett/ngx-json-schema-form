// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const e2eTsConfigPath = require('path').join(__dirname, './tsconfig.e2e.json');
const mainTsConfigPath = require('path').join(__dirname, '../../tsconfig.json')
const tsConfig = require(mainTsConfigPath);

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'firefox',
        'marionette': true,
        'moz:firefoxOptions': {
            args: [ "--headless" ]
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        require('ts-node').register({
            project: e2eTsConfigPath
        });
        require("tsconfig-paths").register({
            project: e2eTsConfigPath,
            baseUrl: './',
            paths: tsConfig.compilerOptions.paths
          });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
