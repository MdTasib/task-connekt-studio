// SELECT ELEMENT
const quizContainer = document.getElementById("quiz");
const mcqContainer = document.querySelector(".mcq");
const homeContainer = document.querySelector(".home");
const resultContainer = document.querySelector(".result");
const timeOutContainer = document.querySelector(".time-out");
const resultsEl = document.getElementById("results");
const timer = document.getElementById("timer");

// SELECT BUTTON
const submitButton = document.getElementById("submit");
const startButton = document.getElementById("start-btn");
const resultButton = document.getElementById("result-btn");
const timeOutButton = document.getElementById("time-out-btn");

/**
 *
 * QUIZ FUNCTIONALITY
 *
 */

// QUIZ DATA
const quizData = [
	{
		question: "What is the past form of 'eat'?",
		answers: {
			a: "eat",
			b: "ate",
			c: "eaten",
			d: "have ate",
		},
		correctAnswer: "b",
	},
	{
		question: "Which sentence is present continuous tense?",
		answers: {
			a: "I eat rice",
			b: "I am eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "b",
	},
	{
		question: "Which sentence is present perfect tense?",
		answers: {
			a: "I eat rice",
			b: "I am eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "c",
	},
	{
		question: "Which sentence is present perfect continuous tense?",
		answers: {
			a: "I eat rice",
			b: "I am eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "d",
	},
	{
		question: "Which sentence is past continuous tense?",
		answers: {
			a: "I eat rice",
			b: "I was eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "b",
	},
	{
		question: "Which sentence is past perfect tense?",
		answers: {
			a: "I eat rice",
			b: "I was eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "c",
	},
	{
		question: "Which sentence is past perfect continuous tense?",
		answers: {
			a: "I eat rice",
			b: "I was eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "d",
	},
	{
		question: "Which sentence is future continuous tense?",
		answers: {
			a: "I eat rice",
			b: "I will be eating rice",
			c: "I have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "b",
	},
	{
		question: "Which sentence is future perfect tense?",
		answers: {
			a: "I eat rice",
			b: "I will be eating rice",
			c: "I will have eaten rice",
			d: "I have been eating rice for 1 year",
		},
		correctAnswer: "c",
	},
	{
		question: "Which sentence is future perfect continuous tense?",
		answers: {
			a: "I eat rice",
			b: "I will be eating rice",
			c: "I will have eaten rice",
			d: "I will have been eating rice for 1 year",
		},
		correctAnswer: "d",
	},
];
generateQuiz(quizData, quizContainer, resultsEl, submitButton);

// GENERATE QUIZ
function generateQuiz(
	questions,
	quizContainer,
	resultsContainer,
	submitButton
) {
	// SHOW QUIZ QUESTIONS
	function showQuestions(questions, quizContainer) {
		// WE'LL NEED A PLACE TO STORE THE OUTPUT AND THE ANSWER CHOICES
		const output = [];
		let answers;

		// FOR EACH QUESTION...
		for (let i = 0; i < questions.length; i++) {
			// FIRST RESET THE LIST OF ANSWERS
			answers = [];

			// FOR EACH AVAILABLE ANSWER...
			for (letter in questions[i].answers) {
				answers.push(`
						<li>
							<label>
              	<input type="radio" name="question${i}" value="${letter}">
              	${questions[i].answers[letter]}
							</label>
            </li>
				`);
			}

			// ADD THIS QUESTION AND ITS ANSWERS TO THE OUTPUT
			output.push(
				`
				<div class="mcq-card">
					<h4 class="question">${i + 1}. ${questions[i].question}</h4>
					<ul class="answers">${answers.join("")}</ul>
					</div>
				`
			);
		}

		// FINALLY COMBINE OUT OUTPUT LIST INTO ONE STRING OF HTML AND PUT IN ON THE PAGE
		quizContainer.innerHTML = output.join("");
	}

	// SHOW RESULTS
	function showResults(questions, quizContainer, resultsContainer) {
		// GATHER ANSWER CONTAINERS FROM OUT QUIZ
		let answerContainers = quizContainer.querySelectorAll(".answers");

		// KEEP TRACK OF USER'S ANSWERS
		let userAnswer = "";
		let numCorrect = 0;

		// FOR EACH QUESTIONS...
		for (let i = 0; i < questions.length; i++) {
			// FIND SELECTED ANSWER
			userAnswer = (
				answerContainers[i].querySelector(
					"input[name=question" + i + "]:checked"
				) || {}
			).value;

			// IF ANSWER IS CORRECT
			if (userAnswer === questions[i].correctAnswer) {
				// ADD TO THE NUMBER OF CORRECT ANSWERS
				numCorrect++;

				// COLOR THE ANSWERS GREEN
				answerContainers[i].style.color = "lightgreen";
			}
			// IF ANSWER IS WRON OR BLACK
			else {
				// COLOR THE ANSWERS RED
				answerContainers[i].style.color = "red";
			}
		}

		// SHOW NUMBER OF CORRECT ANSWERS OUT OF TOTAL
		resultsContainer.innerHTML = numCorrect;
	}

	// SHOW QUESTIONS RIGHT AWAY
	showQuestions(questions, quizContainer);

	// ON SUBMIT, SHOW RESULTS
	submitButton.onclick = function () {
		showResults(questions, quizContainer, resultsContainer);
	};
}

//	REFRESH PAGE
function refreshPage() {
	window.location.reload();
}

/**
 *
 * COUNTDOWN TIMER FUNCTIONALITY
 *
 */

timer.innerHTML = 10 + ":" + 00;

// START TIMER FUNCTION
function startTimer() {
	let presentTime = timer.innerHTML;
	let timeArray = presentTime.split(/[:]+/);
	let m = timeArray[0];
	let s = checkSecond(timeArray[1] - 1);

	// UPDATE UI
	if (m == 0 && s == 00) {
		mcqContainer.style.display = "none";
		timeOutContainer.style.display = "block";
		resultContainer.style.display = "none";
	}

	if (s == 59) {
		m = m - 1;
	}

	if (m < 0) {
		return;
	}

	timer.innerHTML = m + ":" + s;

	setTimeout(startTimer, 1000);
}

// CHECK SECOND
function checkSecond(sec) {
	if (sec < 10 && sec >= 0) {
		sec = "0" + sec;
	} // add zero in front of numbers < 10
	if (sec < 0) {
		sec = "59";
	}
	return sec;
}

/**
 *
 * UI UPDATE WITH BUTTON CLICK
 *
 */

startButton.addEventListener("click", () => {
	mcqContainer.style.display = "block";
	homeContainer.style.display = "none";
	startTimer();
});

submitButton.addEventListener("click", () => {
	mcqContainer.style.display = "none";
	resultContainer.style.display = "block";
});

resultButton.addEventListener("click", () => {
	refreshPage();
});

timeOutButton.addEventListener("click", () => {
	refreshPage();
});
