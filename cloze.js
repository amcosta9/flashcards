/**
 * Created by Ariel on 4/7/2017.
 */
var ClozeCard = function (answer, fullText) {
    // checks that the answer is contained within full text question
    if (fullText.toLowerCase().indexOf(answer.toLowerCase()) >= 0) {
        this.answer = answer;
        this.fullText = fullText;
        this.question = fullText.replace(answer, '...');
    } else {
        throw new Error('Sorry, Answer must be present in Full-text statement');
    }
};

module.exports = ClozeCard;
