let speedTypingTestEl = document.getElementById('speedTypingTest');
let timerEl = document.getElementById('timer');
let quoteDisplayEl = document.getElementById('quoteDisplay');
let resultEl = document.getElementById('result');
let submitBtnEl = document.getElementById('submitBtn');
let quoteInputEl = document.getElementById('quoteInput');
let resetBtnEl = document.getElementById('resetBtn');
let spinnerEl = document.getElementById('spinner');
let uniqueId = null;

timerEl.textContent = 0;

function startTime() {
    let count = 0;
    timerEl.textContent = 0;
    uniqueId = setInterval(function() {
        count += 1;
        timerEl.textContent = count;
    }, 1000);
}

function clearTimer() {
    clearInterval(uniqueId);
}

function getQuotes() {
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove('d-none');
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add('d-none');
            let data = jsonData.content;
            startTime();
            quoteDisplayEl.textContent = data;
        });
}
getQuotes();
submitBtnEl.addEventListener("click", function(event) {
    let inputVal = quoteInputEl.value;
    let quote = quoteDisplayEl.textContent;
    if (inputVal === '') {
        resultEl.textContent = 'You typed incorrect Sentence';
    } else if (inputVal !== quote) {
        resultEl.textContent = 'You typed incorrect Sentence';
    } else if (inputVal === quote) {
        let time = timerEl.textContent;
        clearInterval(uniqueId);
        resultEl.textContent = 'You typed in ' + time + ' seconds';
    }
});
resetBtnEl.addEventListener("click", function(event) {
    clearInterval(uniqueId);
    quoteInputEl.textContent = "";
    resultEl.textContent = '';
    getQuotes();
});