/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, 'alert').mockImplementation(() => {});// catches alert and diverts to empty function

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
    test('choices contains correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true);
    });
    test('turnInProgress key exists', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('turnInProgress key value is false', () => {
        expect('turnInProgress' in game).toBe(true);
    });
});

describe('newGame works correctly', () => {
    //using before all to put values for each object element to test if they get cleared
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button3'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = '42';
        newGame(); // calls new game function so can test outcome
    });
    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('should set playerMoves Array to empty', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('should be one move in the computers game array', () => {
        expect(game.currentGame.length).toBe(1);
    })
    //test('should set currentGame Array to empty', () => {
    //    expect(game.currentGame).toEqual([]);
    //});
    test('should display 0 for element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('gameplay works correctly', () => {
    // beforeEach like beforeAll (before all tests are run) but runs before each test is run
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    //afterEach like beforeEach, but runs after each test is run
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('should call an alert if move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test('should toggle turnInProgress to true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('clicking during computer sequence should fail', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();//simulates click
        expect(game.lastButton).toEqual(''); //event listener on buttons should be disabled so nothing stored
    });
});