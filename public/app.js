// Signup
document.getElementById('signupButton').addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User signed up', userCredential.user);
            alert('Signup successful');
        })
        .catch(error => {
            console.error('Signup error', error);
            alert(error.message);
        });
});

document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('User logged in', userCredential.user);
            alert('Login successful');

            // Redirect to Game Options page
            window.location.href = '/gameOptions';
        })
        .catch(error => {
            console.error('Login error', error);
            alert(error.message);
        });
});
// Monitor authentication state changes
// Monitor authentication state changes
auth.onAuthStateChanged(user => {
    const gameOptions = document.getElementById('gameOptions');
    
    console.log("Auth state changed. User:", user); // Add this line

    if (user) {
        gameOptions.style.display = 'block';
    } else {
        gameOptions.style.display = 'none';
    }
});
document.getElementById('submitAnswersButton').addEventListener('click', () => {
    const questionsForms = document.querySelectorAll('.answerForm');
    const userAnswers = [];

    questionsForms.forEach((form, index) => {
        const selectedAnswers = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
                                     .map(input => parseInt(input.value));

        userAnswers.push({ 
            questionIndex: index, 
            selectedAnswers: selectedAnswers 
        });
    });

    // You can send `userAnswers` to the server for evaluation, store it somewhere, or whatever you intend to do.
    console.log(userAnswers);
});
