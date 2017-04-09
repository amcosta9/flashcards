/**
 * Created by Ariel on 4/8/2017.
 */
var inquirer = require('inquirer'),
    fs = require('fs'),
    basic = require('./basic'),
    cloze = require('./cloze'),
    points = 0;

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Make Flashcard', 'Take Quiz'],
        name: 'action'
    }
]).then(function (data) {
    switch (data.action) {
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
                            fs.appendFile('cards.txt', JSON.stringify(clozeCard), function(error){
                                if (error) {
                                    console.log('error', error);
                                }
                            })
                        });
                        break;
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
                            fs.appendFile('cards.txt', ',' + JSON.stringify(basicCard), function(error){
                                if (error) {
                                    console.log('error', error);
                                }
                            })
                        });
                        break;
                }
            });
            break;
        case 'Take Quiz':
            console.log('taking the quiz!');
            var cards = [];
            var cardsLength = cards.length;
            fs.readFile("cards.txt", "utf8", function(error, data) {
                if (error) {
                    console.log('error', error);
                }
                cards.push(data);
                console.log(cards);
                // function quiz() {
                for (var i = 0; i < cards.length; i++) {
                    var message = cards[i].question;
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: message,
                            name: 'userGuess'
                        }
                    ]).then(function(data) {
                        if (data.userGuess == cards[i].answer){
                            points++;
                            console.log('good job!')
                        } else {
                            console.log('sorry, the answer was: ' + cards[i].answer);
                        }

                    });

                // }

                }

            });
            break;
        default:
            console.log('something went wrong');
    }
});