/**
 * Created by Ariel on 4/8/2017.
 */

// require inquirer and fs to run the app, basic and cloze constructors in separate js files
var inquirer = require('inquirer'),
    fs = require('fs'),
    basic = require('./basic'),
    cloze = require('./cloze'),
    points = 0,
    count = 0,
    currentCard;
    cards = [];

function start() {
    // inquire if the user would like to make flashcard or take quiz
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Make Flashcard', 'Take Quiz'],
            name: 'action'
        }
    ]).then(function (data) {
        switch (data.action) {
            // if user selects to make flashcard, prompt which type of flashcard to make
            case 'Make Flashcard':
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What type of card?',
                        choices: ['Cloze', 'Basic'],
                        name: 'cardType'
                    }
                ]).then(function (data) {
                    switch (data.cardType) {
                        // collect data for cloze card and send to cloze constructor
                        case 'Cloze':
                            console.log('making cloze card');
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    message: 'Full Text',
                                    name: 'fullText'
                                },
                                {
                                    type: 'input',
                                    message: 'Answer',
                                    name: 'answer'
                                }
                            ]).then(function (data){
                                var clozeCard = new cloze(data.answer, data.fullText);
                                console.log(clozeCard);
                                // append new card to cards.txt (starting with new line)
                                fs.appendFile('cards.txt', '\r\n' + JSON.stringify(clozeCard), function(error){
                                    if (error) {
                                        console.log('error', error);
                                    }
                                });
                                // back to main menu
                                start();
                            });
                            break;
                        // collect data for basic card and send to basic constructor
                        case 'Basic':
                            console.log('making basic cards');
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    message: 'Question',
                                    name: 'question'
                                },
                                {
                                    type: 'input',
                                    message: 'Answer',
                                    name: 'answer'
                                }
                            ]).then(function (data){
                                var basicCard = new basic(data.question, data.answer);
                                console.log(basicCard);
                                // append new card to cards.txt (starting with new line)
                                fs.appendFile('cards.txt', '\r\n' + JSON.stringify(basicCard), function(error){
                                    if (error) {
                                        console.log('error', error);
                                    }
                                });
                                // back to main menu
                                start();
                            });
                            break;
                    }
                });
                break;
            // if user selects to take quiz, clear points and counter variables, and read cards.txt
            case 'Take Quiz':
                points = 0;
                count = 0;
                fs.readFile("cards.txt", "utf8", function(error, data) {
                    if (error) {
                        console.log('error', error);
                    }
                    // split data by new lines and assign to cards array
                    cards = data.split("\r\n");
                    // takeQuiz() will loop through cards array and increment using var count
                    function takeQuiz() {
                    currentCard = JSON.parse(cards[count]);
                    // quiz is looping through array 1 extra time unless adding this '-1' after length (but we do not get last question in cards array. unsure how to fix this.
                        if (count < cards.length-1) {
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    message: currentCard.question,
                                    name: 'userGuess'
                                }
                            ]).then(function(answer) {
                                if (answer.userGuess.toLowerCase() == currentCard.answer.toLowerCase()){
                                    points++;
                                    console.log('Woo Hoo!');
                                } else {
                                    console.log('Sorry, the answer was: ' + currentCard.answer);
                                }
                                count++;
                                takeQuiz();

                            });
                        } // end if (count < cards.length)
                        else {
                            console.log('Great job! You scored ' + points + ' points!');
                            // back to main menu
                            start();
                        }
                    } // end takeQuiz()
                takeQuiz();
                });
                break;
            default:
                console.log('something went wrong');
        }
    });
} // end start()

start();

