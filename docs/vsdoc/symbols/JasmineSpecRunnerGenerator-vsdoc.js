
/* vsdoc for JasmineSpecRunnerGenerator */

(function (window) {
    

    window.JasmineSpecRunnerGenerator = function(jasmineDirectory, outputFile, pageTitle){
        /// <summary></summary>
        /// <param name="jasmineDirectory" type="String">Optional. The location of
        ///  jasmine-standalone relative to your web root. Defaults to /jasmine/</param>
        /// <param name="outputFile" type="String">Optional. The name and location of the output
        ///  HTML Jasmine Spec Runner. Defaults to Jasmine Spec Runner.html</param>
        /// <param name="pageTitle" type="String">Optional. The title of the output page. Defaults
        ///  to Jasmine Spec Runner.</param>
        /// <field name="jasmineDirectory" type="String">The location of jasmine-standalone relative to your web root.</field>
        /// <field name="outputFile" type="String">The name and location of the output HTML Jasmine Spec Runner.</field>
        /// <field name="pageTitle" type="String">The title of the output page.</field>
        /// <field name="sourceFiles" type="Array">An array of URL&apos;s relative to your web root which point to files to test.</field>
        /// <field name="specs" type="Array">An array of URL&apos;s relative to your web root which point to test
        ///  specs / fixtures.</field>
        /// <returns type="JasmineSpecRunnerGenerator"/>
    };

    var $x = window.JasmineSpecRunnerGenerator;
    $x.prototype = {
                
        generateSrcUrls: function(fsDir, webDir) {
            /// <summary>Generates SRC URL&apos;s. This will read the filenames located in fsDir and
            ///  build script src paths relative to webDir.</summary>
            /// <param name="fsDir" type="String">The location of source files in the filesystem.</param>
            /// <param name="webDir" type="String">The location of source files relative to your web
            ///  root.</param>
            /// <returns type="Array">Returns an array of URL&apos;s relative to the given webDir
            ///  which point to every file ending in .js located in fsDir.</returns>
        }, 
        
        render: function(err, template) {
            /// <summary>Renders the mustache template.</summary>
            /// <param name="err" type="Error">Any error occurring while attempting to read the
            ///  template file.</param>
            /// <param name="template" type="String">The template as a string.</param>
            /// <returns type="String">Returns the rendered template or throws an error.</returns>
        }, 
        
        addSources: function(fsDir, webDir) {
            /// <summary>Adds source files to test. This will read the filenames located in fsDir
            ///  and build script src paths relative to your web root.</summary>
            /// <param name="fsDir" type="String">The location of source files in the filesystem.</param>
            /// <param name="webDir" type="String">The location of source files relative to your web
            ///  root.</param>
            /// <returns type="Array">Returns the current sourceFiles array.</returns>
        }, 
        
        addSpecs: function(fsDir, webDir) {
            /// <summary>Adds test specs. This will read the filenames located in fsDir and build
            ///  script src paths relative to your web root.</summary>
            /// <param name="fsDir" type="String">The location of source files in the filesystem.</param>
            /// <param name="webDir" type="String">The location of source files relative to your web
            ///  root.</param>
            /// <returns type="Array">Returns the current specs array.</returns>
        }, 
        
        generate: function(callback) {
            /// <summary>Generates the Jasmine Spec Runner as a string and gives it to the
            ///  callback.</summary>
            /// <param name="callback" type="Function">A function which takes a single string
            ///  parameter.</param>
        }, 
        
        generateFile: function(callback) {
            /// <summary>Generates the Jasmine Spec Runner and writes it to outputFile, then calls
            ///  the callback function.</summary>
            /// <param name="callback" type=""></param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "JasmineSpecRunnerGenerator";
})(this);
