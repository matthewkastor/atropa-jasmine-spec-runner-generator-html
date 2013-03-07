A utility for use with [jasmine-standalone](https://github.com/pivotal/jasmine/downloads)

Generates Jasmine Spec Runner html pages for browser based JavaScript tests.
This makes it possible to automatically update the spec runner when building your project.

It's easy to use:
```
var JasmineSpecRunnerGenerator = require(
    'atropa-jasmine-spec-runner-generator-html');

specRunner = new JasmineSpecRunnerGenerator(
    '/js/jasmine/', 'banana tester.html', 'Banana Test Suite');

specRunner.addSources(__dirname, '/js/myLib/');

specRunner.addSpecs('./specs/', '/myLib/test/specs/');

specRunner.generate(console.log);

/*
specRunner.generateFile(
    function () {
        console.log('ok');
    }
);
*/
```

Install it on node from npm

`npm install atropa-jasmine-spec-runner-generator-html`

Visual studio intellisense support is available in docs/vsdoc/OpenLayersAll.js
Full documentation may be found at [http://matthewkastor.github.com/atropa-jasmine-spec-runner-generator-html](http://matthewkastor.github.com/atropa-jasmine-spec-runner-generator-html)