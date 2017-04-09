/**
 * Created by Ariel on 4/7/2017.
 */
var ClozeCard = function (answer, fullText) {
    // checks that the answer is contained within full text question
    if (fullText.toLowerCase().indexOf(answer) >= 0) {
        this.cloze = answer;
        this.fullText = fullText;
        this.partial = fullText.replace(answer, '...');
    } else {
        console.log('Answer must be present in Full-text statement')
    };
};

module.exports = ClozeCard;