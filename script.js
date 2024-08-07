const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const archiveBtn = document.querySelector('.archive')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.info')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

let root = document.documentElement
const checkbox = document.querySelector('.switch input[type="checkbox"]')

let countTime
let minutes = 0
let seconds = 0
let timesArr = []

// START OF THE STOPWATCH COUNTDOWN
const handleStart = () => {
	clearInterval(countTime)

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++
			stopwatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00`
		}
	}, 1000)
}

// PAUSING THE STOPWATCH COUNTDOWN
const handlePause = () => {
	clearInterval(countTime)
}

// STOPPING THE MEASUREMENT
const handleStop = () => {
	time.innerHTML = `Last result: ${stopwatch.textContent}`

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopwatch.textContent)
	}
	clearStuff()
}

// RESETTING THE CURRENT MEASUREMENT AND ARCHIVE
const handleReset = () => {
	time.style.visibility = 'hidden'
	timesArr = []
	clearStuff()
}

const clearStuff = () => {
	clearInterval(countTime)
	stopwatch.textContent = '0:00'
	timeList.textContent = ''
	seconds = 0
	minutes = 0
}

// SHOWING ARCHIVE
const showArchive = () => {
	timeList.textContent = ''
	let num = 1

	timesArr.forEach(time => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Measure no. ${num}: &nbsp; <span>${time}</span>`

		timeList.appendChild(newTime)
		num++
	})
}

// SHOWING INSTRUCTION
const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
	} else {
		modalShadow.style.display = 'none'
	}

	modalShadow.classList.toggle('modal-animation')
}

// CHANGING TO LIGHT/DARK MODE
const toggleColorMode = () => {
	if (checkbox.checked) {
		changeStyleToDark()
	} else {
		changeStyleToLight()
	}
}

const changeStyleToLight = () => {
	root.style.setProperty('--first-color', 'black')
	root.style.setProperty('--second-color', 'white')
	root.style.setProperty('--third-color', '#555')
}
const changeStyleToDark = () => {
	root.style.setProperty('--first-color', 'white')
	root.style.setProperty('--second-color', 'black')
	root.style.setProperty('--third-color', 'lightgrey')
}

// FUNCTION CALL
startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
archiveBtn.addEventListener('click', showArchive)
infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)
checkbox.addEventListener('click', toggleColorMode)
window.addEventListener('click', e => (e.target === modalShadow ? showModal() : false))
