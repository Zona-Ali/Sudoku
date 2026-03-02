let life = 3;
let selectedCell = null;
const l=document.querySelector("#lose");
const cells = document.querySelectorAll(".cell");
const numbers = document.querySelectorAll(".num");
const form = document.getElementById("form");
const life1=document.querySelector("#h1");
const life2=document.querySelector("#h2");
const life3=document.querySelector("#h3");
cells.forEach(cell => {
    cell.addEventListener("click", function() {
        selectedCell = this;
    });
});

numbers.forEach(num => {
    num.addEventListener("click", function() {

        if (selectedCell !== null && life > 0) {

            let index = selectedCell.id.slice(1);
            let value = this.textContent;

            selectedCell.value = value;

            if (value != g[index]) {
                selectedCell.style.backgroundColor = "red";
                life--;
                if(life===2){
                    h3.style.color = "transparent";
                }
                if(life===1){
                    h2.style.color = "transparent";
                }
                if (life === 0) {
                    h1.style.color = "transparent";
                     stopTimer()

                    form.requestSubmit();  
                }
                setTimeout(() => {
                    selectedCell.style.backgroundColor = "pink";
                }, 700);

            } else {
                selectedCell.style.backgroundColor = "white";
            }
            if (checkIfComplete()) {
                form.requestSubmit();
            }
        }
    });
});
function checkIfComplete() {
    const inputs = document.querySelectorAll(".cell");

    for (let input of inputs) {
        if (input.value === "") {
            return false; 
        }
    }
    return true; 
}

let totalSeconds = 0;
let interval = null;

const timer = document.getElementById("timer");

function startTimer() {
    if (interval) return; // prevent multiple timers

    interval = setInterval(() => {
        totalSeconds++;

        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;

        timer.textContent =
            String(mins).padStart(2, '0') + ":" +
            String(secs).padStart(2, '0');
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

startTimer()

console.log(g)