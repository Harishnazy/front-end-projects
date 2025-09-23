const input = document.querySelector('.input__field');
const inputIcon = document.querySelector('.input__icon');
const passwordStrength = document.querySelector('.password-bar');
const passwordLabel = document.querySelector('.password-label');

inputIcon.addEventListener('click', (e) => {
    e.prevenDefault();

    inputIncon.setAttribute('src', input.getAttribute('type') === 'password' ? './assets/eye-open.svg' : './assets/eye-closed.svg');
    input.setAttribute('type', input.getAttribute('type') === 'password' ? 'text' : 'password');
});

input.addEventListener("Keyup", 
    function() {
        let pass = document.getElementById("password").value;
        checkStreagth(pass);
    }
);

const rules = [{
    name : 'low-upper-case',
    pattern: /(?=.*[a-z])(?=.*[A-Z])/,
},{
    name : 'one-number',
    pattern: /(?=.*\d)/,
},{
    name : 'one-special-char',
    pattern: /(?=.*[!@#$%^&*])/,
},{
    name : 'min-8-char',
    pattern: /.{8,}/,
}];

const checkRule = (password, strength, {pattern, name}) => {
    if(password.match(pattern)) {
        strength += 1;
        document.querySelector(`.${name} img`);
        img.src = "./assets/icon-check.svg";
    } else {
        const img = document.querySelector(`.${name} img`);
        img.src = "./assets/icon-uncheck.svg";
    }
    return strength;
}

const passwordStrengthProgressRules = [
    {
        minStrength: 1,
        width: '25%',
        class: 'very-weak',
        label: 'Very Weak',
    },
    {
        maxStrength: 2,
        width: '50%',
        class: 'weak',
        label: 'Weak',
    },
    {
        maxStrength: 3,
        width: '75%',
        class: 'medium',
        label: 'Medium',
    },
    {
        maxStrength: 4,
        width: '100%',
        class: 'strong',
        label: 'Strong',
    },
];

const makeProgressBar = (strength) => {
    const rule = passwordStrengthProgressRules.find(
        r => strength <= r.maxStrength && strength >= r.minStrength
    )
    if(rule) {
        passwordStrength.style.width = rule.width;
        passwordStrength.className = `password-bar ${rule.class}`;
        passwordLabel.textContent = rule.label;
    } else {
        passwordStrength.style.width = '0%';
        passwordStrength.className = 'password-bar';
        passwordLabel.textContent = '';
    }
}

const checkStreagth = (password) => {
    let strength = 0;
    rules.forEach(rule => {
        strength = checkRule(password, strength, rule);
    });
    makeProgressBar(strength);
}
