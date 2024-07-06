/**
 * @jest-environment jsdom
 */

const { game } = require('../game');

beforeAll(() => {
    let fs = require('fs'); //load the 'fs' file system handling module that is built into node.js
    let fileContents = fs.readFileSync('index.html', 'utf-8'); //saves html to variable using utf-8 character set
    //attaching the html to the mock DOM.
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
});