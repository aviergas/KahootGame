const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('C:\\Users\\LENOVO\\Desktop\\simple-game\\hatzroni-ac6c3-firebase-adminsdk-fjtpe-ab126d853f.json'); // Replace with your Firebase SDK JSON path

const app = express();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static assets from the "public" directory
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.render('signUp');
});

// Game Options route
app.get('/gameOptions', (req, res) => {
    res.render('gameOptions');
});
// Results route
app.get('/results', (req, res) => {
    res.render('results'); // Assuming you named the new file as 'results.ejs'
});
// Form Creation route
app.get('/formCreation', (req, res) => {
    res.render('formCreation');
});

// Signup route
app.get('/signup', (req, res) => {
    res.render('signUp');
});

// Login route
app.get('/login', (req, res) => {
    res.render('login'); // Make sure you have a corresponding 'login.ejs' view
});

// Game Display route based on a game code
app.get('/gameDisplay/:gameCode', (req, res) => {
    const gameCode = req.params.gameCode;

    db.collection('games').doc(gameCode).get()
        .then(doc => {
            if (doc.exists) {
                const gameData = doc.data();
                console.log('Game data:', gameData);
                console.log('Game questions:', gameData.questions); 
                res.render('gameDisplay', { questions: gameData.questions });
                
            } else {
                res.status(404).send('Game not found');
            }
        })
        .catch(error => {
            console.error("Error fetching game:", error);
            res.status(500).send('Error fetching game');
        });
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
