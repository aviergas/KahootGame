document.getElementById('addQuestionButton').addEventListener('click', () => {
    const questionsContainer = document.getElementById('questionsContainer');

    const questionDiv = document.createElement('div');
    questionDiv.className = 'questionDiv';

    const questionInput = document.createElement('input');
    questionInput.className = 'questionInput';
    questionInput.placeholder = 'Enter your question';

    const answersContainer = document.createElement('div');
    answersContainer.className = 'answersContainer';

    const addAnswerButton = document.createElement('button');
    addAnswerButton.className = 'addAnswerButton';
    addAnswerButton.innerText = 'Add Answer';
    addAnswerButton.addEventListener('click', () => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answerDiv';

        const answerCheckbox = document.createElement('input');
        answerCheckbox.type = 'checkbox';
        
        const answerInput = document.createElement('input');
        answerInput.placeholder = 'Enter an answer';
        
        answerDiv.appendChild(answerCheckbox);
        answerDiv.appendChild(answerInput);
        answersContainer.appendChild(answerDiv);
    });

    questionDiv.appendChild(questionInput);
    questionDiv.appendChild(addAnswerButton);
    questionDiv.appendChild(answersContainer);
    questionsContainer.appendChild(questionDiv);
});

document.getElementById('submitQuestionsButton').addEventListener('click', async () => {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionsData = [];

    // Collect questions and answers
    for (let questionDiv of questionsContainer.children) {
        const questionText = questionDiv.querySelector('.questionInput').value;

        const answerDivs = Array.from(questionDiv.querySelectorAll('.answersContainer .answerDiv'));
        const answers = [];
        const correctAnswers = [];
        console.log('Current questionDiv:', questionDiv.outerHTML);
console.log('Query for questionInput:', questionDiv.querySelector('.questionInput'));

        answerDivs.forEach((div, index) => {
            console.log('Current answerDiv:', div.outerHTML);
console.log('Query for text input:', div.querySelector('input[type="text"]'));
console.log('Query for checkbox:', div.querySelector('input[type="checkbox"]'));

            const answerText = div.querySelector('input:not([type="checkbox"])').value;

            const isCorrect = div.querySelector('input[type="checkbox"]').checked;

            answers.push(answerText);
            if (isCorrect) correctAnswers.push(index);
        });
        
        questionsData.push({ question: questionText, answers: answers, correctAnswers: correctAnswers });
    }

    try {
        // Save to Firestore
        const gameRef = await firebase.firestore().collection('games').add({
            questions: questionsData
        });

        alert(`Game created successfully! Share this Game ID with your friend: ${gameRef.id}`);
    } catch (error) {
        console.error('Error saving game data to Firestore:', error);
        alert('Failed to save the game. Please try again.');
    }
});
