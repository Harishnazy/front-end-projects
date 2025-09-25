const input = document.querySelector('.input__field');
const passwordStrengthBar = document.getElementById('password-strength');
const resultLabel = document.getElementById('result');

// Rule selectors must match HTML class names
const ruleItems = [
    {
        selector: '.low-upper-case',
        pattern: /(?=.*[a-z])(?=.*[A-Z])/,
        success: "Lowercase & Uppercase"
    },
    {
        selector: '.number',
        pattern: /(?=.*\d)/,
        success: "Number (0-9)"
    },
    {
        selector: '.special-character',
        pattern: /(?=.*[!@#$%^&*])/,
        success: "Special Character (!@#$%^&*)"
    },
    {
        selector: '.eight-character',
        pattern: /.{8,}/,
        success: "At least 8 characters"
    }
];

// You can use your own SVGs or PNGs for checked/unchecked
const CHECK_ICON = "./assets/icon-check.svg";
const UNCHECK_ICON = "./assets/icon-uncheck.svg";

// Show/hide password (uncomment if you add the icon to HTML)
/*
const inputIcon = document.getElementById('togglePassword');
inputIcon.addEventListener('click', () => {
    if (input.type === "password") {
        input.type = "text";
        inputIcon.src = "./assets/eye-open.svg";
    } else {
        input.type = "password";
        inputIcon.src = "./assets/eye-closed.svg";
    }
});
*/

input.addEventListener("input", function () {
    const password = input.value;
    let strength = 0;

    ruleItems.forEach(rule => {
        const li = document.querySelector(rule.selector);
        const img = li.querySelector('img');
        if (rule.pattern.test(password)) {
            strength++;
            img.src = CHECK_ICON;
            img.alt = "Checked";
            li.style.opacity = "1";
        } else {
            img.src = UNCHECK_ICON;
            img.alt = "Unchecked";
            li.style.opacity = "0.6";
        }
    });

    // Progress bar and label
    let width = "0%";
    let color = "var(--danger)";
    let label = "";
    if (strength === 1) {
        width = "25%";
        color = "var(--danger)";
        label = "Very Weak";
    } else if (strength === 2) {
        width = "50%";
        color = "var(--warning)";
        label = "Weak";
    } else if (strength === 3) {
        width = "75%";
        color = "var(--warning)";
        label = "Medium";
    } else if (strength === 4) {
        width = "100%";
        color = "var(--success)";
        label = "Strong";
    }
    passwordStrengthBar.style.width = width;
    passwordStrengthBar.style.background = color;
    resultLabel.textContent = label;
    resultLabel.className = '';
    if (strength === 1) resultLabel.classList.add('label-danger');
    else if (strength === 2 || strength === 3) resultLabel.classList.add('label-warning');
    else if (strength === 4) resultLabel.classList.add('label-success');
});
