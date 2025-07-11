// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "Who established Jawahar Navodaya Vidyalaya?",
    answers: [
      { text: "Indra Gandhi", correct: false },
      { text: "Atal Bihari Vajpayee", correct: false },
      { text: "Rajiv Gandhi", correct: true },
      { text: "APJ Abdul Kalam", correct: false },
    ],
  },
  {
    question: "Which BTS song broke YouTube records for the most views in 24 hours in 2020?",
    answers: [
      { text: "Fake Love", correct: false },
      { text: "Butter", correct: true },
      { text: "Dynamite", correct: false },
      { text: "Boy With Luv", correct: false },
    ],
  },
  {
    question: "Which mineral is Koderma famously known for?",
    answers: [
      { text: "Bauxite", correct: false },
      { text: "Coal", correct: false },
      { text: "Iron", correct: false },
      { text: "Mica", correct: true },
    ],
  },
  {
    question: "Why is Jaipur known as the Pink City?",
    answers: [
      { text: "City of roses", correct: false },
      { text: "Pink stoned mined locally", correct: false },
      { text: "Buildings painted pink to welcome Prince of Wales", correct: true },
      { text: "Royal decree for luck", correct: false },
    ],
  },
  {
    question: "Which song is sung by Billie Eilish?",
    answers: [
      { text: "Die With A Smile", correct: false },
      { text: "Somewhere Only We Know", correct: false },
      { text: "Happier Than Ever", correct: true },
      { text: "Seven Years Old", correct: false },
    ],
  },
];

// Game State
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Initialize
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Theme Preference Setup
document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = localStorage.getItem("theme") === "dark";
  if (prefersDark) {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
});

// Theme Toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selected) {
      btn.classList.add("incorrect");
    }
  });

  if (correct) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius! 🎯";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff! 👍";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning! 📚";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve! 💪";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better! ✨";
  }

  progressBar.style.width = "100%";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
