
const questions = [
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: ["Júpiter", "Saturno", "Neptuno", "Urano"],
        correct: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg"
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Miguel Ángel"],
        correct: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
    },
    {
        question: "¿Cuál es el elemento químico más abundante en el universo?",
        answers: ["Oxígeno", "Carbono", "Hidrógeno", "Helio"],
        correct: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Hydrogen_discharge_tube.jpg/1200px-Hydrogen_discharge_tube.jpg"
    },
    {
        question: "¿En qué año comenzó la Primera Guerra Mundial?",
        answers: ["1914", "1918", "1939", "1945"],
        correct: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Bundesarchiv_Bild_183-R05148%2C_Westfront%2C_deutsche_Infanterie.jpg/1200px-Bundesarchiv_Bild_183-R05148%2C_Westfront%2C_deutsche_Infanterie.jpg"
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
        correct: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Nile_River_and_delta_from_orbit.jpg/1200px-Nile_River_and_delta_from_orbit.jpg"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const timeoutSound = document.getElementById('timeout-sound');

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });
    
    // Add image to the question
    const imageElement = document.createElement('img');
    imageElement.src = question.image;
    imageElement.style.maxWidth = '100%';
    imageElement.style.height = 'auto';
    imageElement.style.marginBottom = '20px';
    document.getElementById('question').insertAdjacentElement('beforebegin', imageElement);
    
    resetTimer();
    updateProgressBar();
}

function checkAnswer(answerIndex) {
    clearInterval(timer);
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => button.disabled = true);
    
    if (answerIndex === question.correct) {
        score++;
        document.getElementById('score-value').textContent = score;
        buttons[answerIndex].style.backgroundColor = '#4CAF50';
        correctSound.play();
        buttons[answerIndex].classList.add('pulse');
    } else {
        buttons[answerIndex].style.backgroundColor = '#f44336';
        buttons[question.correct].style.backgroundColor = '#4CAF50';
        incorrectSound.play();
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }, 2000);
}

function resetTimer() {
    timeLeft = 10;
    document.getElementById('time-left').textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            timeoutSound.play();
            checkAnswer(-1);
        }
    }, 1000);
}

function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function endGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1>Juego terminado</h1>
        <p>Tu puntuación final es: ${score} de ${questions.length}</p>
        <button onclick="restartGame()" class="answer-btn">Jugar de nuevo</button>
    `;
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score-value').textContent = score;
    loadQuestion();
}

window.onload = loadQuestion;
