// dom elements
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const questionTxt = document.getElementById('question-text');
const currentQuestion = document.getElementById('current-question');
const totalQuestion = document.getElementById('total-question');
const scoreSpan = document.getElementById('score');
const answersContainer = document.getElementById('answers-container');
const progress = document.getElementById('progress');
const resultScreen = document.getElementById('result-screen');
const finalScr = document.getElementById('final-score');
const maxScr = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

// quiz questions
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Trainer Marking Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Marketing Language", correct: false},
            {text: "Hyper Tool Multi Language", correct: false},
        ],
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "O2", correct: false},
            {text: "CO2", correct: false},
            {text: "H2O", correct: true},
            {text: "HO", correct: false},
        ],
    },
    {
        question: "What is the value of 7 × 8?",
        answers: [
            {text: "54", correct: false},
            {text: "56", correct: true},
            {text: "58", correct: false},
            {text: "64", correct: false},
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
        ],
    },
    {
        question: "Which language is primarily used for styling web pages?",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "Python", correct: false},
            {text: "CSS", correct: true},
            {text: "HTML", correct: false},
        ],
    },
]

// quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestion.textContent = quizQuestions.length;
maxScr.textContent = quizQuestions.length;

// event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);


function startQuiz(){
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    // reset state
    answersDisabled = false;

    const questionData = quizQuestions[currentQuestionIndex];

    currentQuestion.textContent = currentQuestionIndex + 1;
    
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progress.style.width = progressPercent + "%";
    
    questionTxt.textContent = questionData.question;

    // clear previous answers
    answersContainer.innerHTML = "";

    // create answer buttons
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        
        // dataset to store if the answer is correct or not
        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button); 
    })
}

function selectAnswer(event) {
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        else if (button === selectedBtn){
            button.classList.add('incorrect');
        }
});

if(isCorrect){
    score++;
    scoreSpan.textContent = score;
}

setTimeout(() => {
    currentQuestionIndex++;

    //check if there are more questions
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    } else {
        // show result screen
        showResults();
    }
}, 1000);

}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScr.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage === 100){
        resultMessage.textContent = "Excellent work!";
    } else if(percentage >= 80){
        resultMessage.textContent = "Good job!";
    } else if (percentage >= 60){
        resultMessage.textContent = "Good effort! Keep practicing!";
    } else if (percentage >= 40){
        resultMessage.textContent = "Not bad, but there's room for improvement!";
    } else {
        resultMessage.textContent = "Don't worry, keep learning and you'll get better!";
}
}


function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}