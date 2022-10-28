// SELECT ELEMENT
const quizContainer = document.getElementById("quiz");
const mcqContainer = document.getElementById("mcq");
const homeContainer = document.getElementById("home");
const resultContainer = document.getElementById("result");
const timeOutContainer = document.getElementById("time-out");
const resultsEl = document.getElementById("results");
const timer = document.getElementById("timer");

// SELECT BUTTON
const submitButton = document.getElementById("submit");
const startButton = document.getElementById("start-btn");
const resultButton = document.getElementById("result-btn");
const timeOutButton = document.getElementById("time-out-btn");

/**
 *
 * COUNTDOWN TIMER FUNCTIONALITY
 *
 */

timer.innerHTML = 10 + ":" + 00;
startTimer();

// START TIMER FUNCTION
function startTimer() {
	let presentTime = timer.innerHTML;
	let timeArray = presentTime.split(/[:]+/);
	let m = timeArray[0];
	let s = checkSecond(timeArray[1] - 1);

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
];

generateQuiz(quizData, quizContainer, resultsEl, submitButton);

function generateQuiz(
	questions,
	quizContainer,
	resultsContainer,
	submitButton
) {
	function showQuestions(questions, quizContainer) {
		// we'll need a place to store the output and the answer choices
		const output = [];
		let answers;

		// for each question...
		for (let i = 0; i < questions.length; i++) {
			// first reset the list of answers
			answers = [];

			// for each available answer...
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

			// add this question and its answers to the output
			output.push(
				`
				<div class="mcq-card">
					<h4 class="question">${i + 1}. ${questions[i].question}</h4>
					<ul class="answers">${answers.join("")}</ul>
					</div>
				`
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join("");
	}

	// SHOW RESULTS
	function showResults(questions, quizContainer, resultsContainer) {
		// gather answer containers from our quiz
		let answerContainers = quizContainer.querySelectorAll(".answers");

		// keep track of user's answers
		let userAnswer = "";
		let numCorrect = 0;

		// for each question...
		for (let i = 0; i < questions.length; i++) {
			// find selected answer
			userAnswer = (
				answerContainers[i].querySelector(
					"input[name=question" + i + "]:checked"
				) || {}
			).value;

			// if answer is correct
			if (userAnswer === questions[i].correctAnswer) {
				// add to the number of correct answers
				numCorrect++;

				// color the answers green
				answerContainers[i].style.color = "lightgreen";
			}
			// if answer is wrong or blank
			else {
				// color the answers red
				answerContainers[i].style.color = "red";
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML = numCorrect;
	}

	// show questions right away
	showQuestions(questions, quizContainer);

	// on submit, show results
	submitButton.onclick = function () {
		showResults(questions, quizContainer, resultsContainer);
	};
}
