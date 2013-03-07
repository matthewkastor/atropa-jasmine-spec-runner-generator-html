/*jslint
    white: true,
    node: true,
    stupid: true,
    nomen: true
*/

/**
 * Generates an HTML Jasmine Spec Runner for running tests in a web browser.
 * @class Generates an HTML Jasmine Spec Runner for running tests in a web
 *  browser.
 * @param {String} jasmineDirectory Optional. The location of
 *  jasmine-standalone relative to your web root. Defaults to /jasmine/
 * @param {String} outputFile Optional. The name and location of the output
 *  HTML Jasmine Spec Runner. Defaults to Jasmine Spec Runner.html
 * @param {String} pageTitle Optional. The title of the output page. Defaults
 *  to Jasmine Spec Runner.
 * @requires <a href="https://npmjs.org/package/mustache">mustache</a>
 * @requires <a href="http://nodejs.org/api/fs.html">fs</a>
 * @requires <a href="http://nodejs.org/api/path.html">path</a>
 * @example
 * var JasmineSpecRunnerGenerator = require(
 *      'atropa-jasmine-spec-runner-generator-html');
 * 
 * specRunner = new JasmineSpecRunnerGenerator(
 *      '/js/jasmine/', 'banana tester.html', 'Banana Test Suite');
 * 
 * specRunner.addSources(__dirname, '/js/myLib/');
 * 
 * specRunner.addSpecs('./specs/', '/myLib/test/specs/');
 * 
 * specRunner.generate(console.log);
 * 
 * 
 * // specRunner.generateFile(
 * //     function () {
 * //         console.log('ok');
 * //     }
 * // );
 */
var JasmineSpecRunnerGenerator = function JasmineSpecRunnerGenerator(
        jasmineDirectory,
        outputFile,
        pageTitle
) {
    "use strict";
    var my, fs, path, mustache, templatePath;
    
    my = this;
    fs = require('fs');
    path = require('path');
    
    mustache = require('mustache');
    templatePath = path.resolve(__dirname, '../templates/SpecRunner.mustache');
    
    /**
     * The location of jasmine-standalone relative to your web root.
     * @type String
     * @fieldOf JasmineSpecRunnerGenerator#
     * @default /jasmine/
     * @see JasmineSpecRunnerGenerator#generate
     * @see <a href="https://github.com/pivotal/jasmine/downloads">
     * jasmine-standalone</a>
     */
    this.jasmineDirectory = jasmineDirectory || '/jasmine/';
    this.jasmineDirectory = String(my.jasmineDirectory ).replace(/\\/g, '/');
    /**
     * The name and location of the output HTML Jasmine Spec Runner.
     * @type String
     * @fieldOf JasmineSpecRunnerGenerator#
     * @default Jasmine Spec Runner.html
     * @see JasmineSpecRunnerGenerator#generateFile
     */
    this.outputFile = outputFile || 'Jasmine Spec Runner.html';
    /**
     * The title of the output page.
     * @type String
     * @fieldOf JasmineSpecRunnerGenerator#
     * @default Jasmine Spec Runner
     * @see JasmineSpecRunnerGenerator#generate
     */
    this.pageTitle = pageTitle || 'Jasmine Spec Runner';
    /**
     * An array of URL's relative to your web root which point to files to test.
     * @type Array
     * @fieldOf JasmineSpecRunnerGenerator#
     * @default []
     * @see JasmineSpecRunnerGenerator#addSources
     */
    this.sourceFiles = [];
    /**
     * An array of URL's relative to your web root which point to test
     *  specs / fixtures.
     * @type Array
     * @fieldOf JasmineSpecRunnerGenerator#
     * @default []
     * @see JasmineSpecRunnerGenerator#addSpecs
     */
    this.specs = [];
    /**
     * Generates SRC URL's. This will read the filenames located in fsDir and
     *  build script src paths relative to webDir.
     * @private
     * @inner
     * @param {String} fsDir The location of source files in the filesystem.
     * @param {String} webDir The location of source files relative to your web
     *  root.
     * @returns {Array} Returns an array of URL's relative to the given webDir
     *  which point to every file ending in .js located in fsDir.
     */
    function generateSrcUrls(fsDir, webDir) {
        var sources = fs.readdirSync(path.normalize(fsDir));
        sources = sources.filter(function (filename) {
            var stat, out;
            try {
                stat = fs.statSync(path.resolve(fsDir, filename));
                if(stat.isFile()) {
                    out = filename.match(/\.js$/);
                }
            } catch (e) {
                out = false;
            }
            return out;
        });
        sources = sources.map(function (item) {
            return webDir + item;
        });
        return sources;
    }
    /**
     * Renders the mustache template.
     * @private
     * @inner
     * @param {Error} err Any error occurring while attempting to read the
     *  template file.
     * @param {String} template The template as a string.
     * @returns {String} Returns the rendered template or throws an error.
     * @throws {Error} Throws "could not read template at: [template path]"
     */
    function render (err, template) {
        var view;
        if(err) {
            throw new Error('could not read template at: ' + templatePath);
        } else {
            view = {
                'pageTitle'                    : my.pageTitle,
                'jasmineStandaloneWebDirectory': my.jasmineDirectory,
                'sourceFiles'                  : my.sourceFiles,
                'testSpecs'                    : my.specs
            };
        }
        return mustache.render(template, view)
    }
    /**
     * Adds source files to test. This will read the filenames located in fsDir
     *  and build script src paths relative to your web root.
     * @methodOf JasmineSpecRunnerGenerator#
     * @param {String} fsDir The location of source files in the filesystem.
     * @param {String} webDir The location of source files relative to your web
     *  root.
     * @returns {Array} Returns the current sourceFiles array.
     * @see JasmineSpecRunnerGenerator#sourceFiles
     */
    this.addSources = function (fsDir, webDir) {
        var sources = generateSrcUrls(fsDir, webDir);
        my.sourceFiles = my.sourceFiles.concat(sources);
        return my.sourceFiles;
    };
    /**
     * Adds test specs. This will read the filenames located in fsDir and build
     *  script src paths relative to your web root.
     * @methodOf JasmineSpecRunnerGenerator#
     * @param {String} fsDir The location of source files in the filesystem.
     * @param {String} webDir The location of source files relative to your web
     *  root.
     * @returns {Array} Returns the current specs array.
     * @see JasmineSpecRunnerGenerator#specs
     */
    this.addSpecs = function (fsDir, webDir) {
        var sources = generateSrcUrls(fsDir, webDir);
        my.specs = my.specs.concat(sources);
        return my.specs;
    };
    /**
     * Generates the Jasmine Spec Runner as a string and gives it to the
     *  callback.
     * @methodOf JasmineSpecRunnerGenerator#
     * @param {Function} callback A function which takes a single string
     *  parameter.
     * @see JasmineSpecRunnerGenerator#generateFile
     */
    this.generate = function (callback) {
        callback = callback || function () {};
        function cb (err, data) {
            callback(render(err, data));
        }
        fs.readFile(templatePath, 'utf8', cb);
    };
    
    /**
     * Generates the Jasmine Spec Runner and writes it to outputFile, then calls
     *  the callback function.
     * @methodOf JasmineSpecRunnerGenerator#
     * @see JasmineSpecRunnerGenerator#outputFile
     * @see JasmineSpecRunnerGenerator#generate
     */
    this.generateFile = function (callback) {
        var outputFile = path.normalize(my.outputFile);
        
        function cb (err) {
            if(err) {
                throw new Error('Could not write file ' + outputFile);
            } else {
                callback();
            }
        }
        
        function write (content) {
            fs.writeFile(
                outputFile,
                content,
                'utf8',
                cb
            );
        }
        
        my.generate(write);
    };
};


module.exports = JasmineSpecRunnerGenerator;


