/**
 * Created by Ariel on 4/8/2017.
 */

// require inquirer and fs to run the app, basic and cloze constructors in separate js files
var inquirer = require('inquirer'),
    fs = require('fs'),
    basic = require('./basic'),
    cloze = require('./cloze'),
    points = 0,
    count = 0;

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
        // if user selects to make flashcard, prompt which type flashcard
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
                            // append new card to cards.txt
                            fs.appendFile('cards.txt', JSON.stringify(clozeCard), function(error){
                                if (error) {
                                    console.log('error', error);
                                }
                            })
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
                            // append new card to cards.txt
                            fs.appendFile('cards.txt', JSON.stringify(basicCard), function(error){
                                if (error) {
                                    console.log('error', error);
                                }
                            })
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
                var cards = JSON.parse(data);
                // takeQuiz() will loop through cards array and increment using var count
                function takeQuiz() {
                    if (count < cards.length) {
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: cards[count].question,
                                name: 'userGuess'
                            }
                        ]).then(function(answer) {
                            if (answer.userGuess.toLowerCase() == cards[count].answer.toLowerCase()){
                                points++;
                                console.log('Woo Hoo!')
                            } else {
                                console.log('Sorry, the answer was: ' + cards[count].answer);
                            }
                            count++;
                            takeQuiz();

                        });
                    } // end if (count < cards.length)
                    else {
                        console.log('Great job! You scored ' + points + ' points!');
                    }
                } // end takeQuiz()
            takeQuiz();
            });
            break;
        default:
            console.log('something went wrong');
    }
});