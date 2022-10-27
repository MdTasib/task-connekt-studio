const timer = document.getElementById("timer");

timer.innerHTML = 01 + ":" + 05;
startTimer();

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

function checkSecond(sec) {
	if (sec < 10 && sec >= 0) {
		sec = "0" + sec;
	} // add zero in front of numbers < 10
	if (sec < 0) {
		sec = "59";
	}
	return sec;
}
