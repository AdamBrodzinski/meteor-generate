// See docs for more info: http://docs.meteor.com/#browserpolicy


// --------------  Frame options ---------------

BrowserPolicy.framing.disallow();
//BrowserPolicy.framing.restrictToOrigin('http://origin.com');
//BrowserPolicy.framing.allowAll();


// -------------  Content options  -------------

//BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.disallowInlineScripts();
//BrowserPolicy.content.allowEval();
//BrowserPolicy.content.disallowEval(); // default
//BrowserPolicy.content.allowInlineStyles() // default
//BrowserPolicy.content.disallowInlineStyles();

