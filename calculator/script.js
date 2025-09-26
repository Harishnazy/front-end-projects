const currentDisplay = document.querySelector('.current-display');
const previousDisplay = document.querySelector('.previous-display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operation');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
let operation;

function appendNumber(number) {
    if (number === "." && currentDisplay.innerText.includes(".")) return;
    currentDisplay.innerText += number;
}

function chooseOperation(operand) {
    if (currentDisplay.innerText === "") return;
    compute(operand);
    operation = operand;
    currentDisplay.innerText += operand;
    previousDisplay.innerText = currentDisplay.innerText;
    currentDisplay.innerText = "";
}

function clearDisplay() {
    currentDisplay.innerText = "";
    previousDisplay.innerText = "";
}

function compute(operand) {
    let result;
    const prev = parseFloat(previousDisplay.innerText);
    const current = parseFloat(currentDisplay.innerText);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operand) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }
    currentDisplay.innerText = result;
}

numbers.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

equalsBtn.addEventListener('click', () => {
    compute(operation);
    previousDisplay.innerText = "";
});

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', () => {
    currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
}
);

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
});