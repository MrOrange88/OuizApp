let questions = [
  {
    question: "What is the capital of France?",
    answer_1: "Berlin",
    answer_2: "Madrid",
    answer_3: "Paris",
    answer_4: "Rome",
    right_answer: 3,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer_1: "Earth",
    answer_2: "Mars",
    answer_3: "Jupiter",
    answer_4: "Saturn",
    right_answer: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    answer_1: "Atlantic Ocean",
    answer_2: "Indian Ocean",
    answer_3: "Arctic Ocean",
    answer_4: "Pacific Ocean",
    right_answer: 4,
  },
  {
    question: "How big is the highest mountain?",
    answer_1: "Mount Everest",
    answer_2: "K2",
    answer_3: "Kangchenjunga",
    answer_4: "Lhotse",
    right_answer: 1,
  },
];

let rightAnswer = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio("./assets/sounds/right.mp3");
let AUDIO_FAIL = new Audio("./assets/sounds/wrong.mp3");

function init() {
  document.getElementById("all-questions").innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function answer(selectedAnswer) {
  let question = questions[currentQuestion];
  let selectedAnswerNumber = selectedAnswer.slice(-1);

  idOfRightAnswer = "answer_" + question["right_answer"];

  if (rightAnswerSelected(selectedAnswerNumber, question)) {
    document
      .getElementById(selectedAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    rightAnswer++;
  } else {
    document
      .getElementById(selectedAnswer)
      .parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedAnswerNumber, question) {
  return selectedAnswerNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButton();
  showQuestion();
}

function resetAnswerButton() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
}

function restartGame() {
  document.getElementById("header-image").src = "./assets/quiz.png";
  document.getElementById("endScreen").style = "display: none";
  document.getElementById("questionBody").style = "";
  rightAnswer = 0;
  currentQuestion = 0;
  showQuestion();
}

function showEndScreen() {
  document.getElementById("header-image").src = "./assets/trophy.png";
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none";
  document.getElementById("correctAnswers").innerHTML = rightAnswer;
  document.getElementById("totalQuestions").innerHTML = questions.length;
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById("progress-bar").innerHTML = `${percent}%`;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}
