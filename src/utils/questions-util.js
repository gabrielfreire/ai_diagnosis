export class QuestionsUtil {
    constructor() {}

    /**
     * Returns a question by key
     * @param key question key
     * @param questions array of questions to look
     */
    getQuestion(questions, key) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].key === key) {
                return questions[i];
            }
        }
        return null;
    }

    /**
     * Update a specific question
     * @param questions array of questions to look
     * @param key question key
     * @param newQuestion new question to update
     */
    updateQuestion(questions, key, newQuestion) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].key === key) {
                questions[i] = newQuestion;
            }
        }
    }

}