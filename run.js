/**
 * Created by Ariel on 4/8/2017.
 */
var inquirer = require('inquirer'),
    fs = require('fs'),
    basic = require('./basic'),
    cloze = require('./cloze');

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
                            fs.appendFile('cards.txt', JSON.stringify(basicCard) + '\n', function(error){
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
            // inquirer.prompt([
            //     {
            //         type: 'input',
            //         message: '',
            //         name: 'queston'
            //     }
            // ]);
            break;
        default:
            console.log('something went wrong');
    }
});