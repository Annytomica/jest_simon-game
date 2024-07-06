/**
 * @jest-environment jsdom
 */

beforeAll(() => {
    // document.body.innerHTML = '<p id="par" ></p>'; //do this if just testing a small part of a web page
    let fs = require('fs'); //load the 'fs' file system handling module that is built into node.js
    let fileContents = fs.readFileSync('index.html', 'utf-8'); //saves html to variable using utf-8 character set
    //attaching the html to the mock DOM.
    document.open();
    document.write(fileContents);
    document.close();
});