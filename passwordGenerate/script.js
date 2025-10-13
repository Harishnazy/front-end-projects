const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function updateLength() {
  const length = document.getElementById("length").value;
  document.getElementById("lengthValue").textContent = length;
}

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  let chars = "";
  if (includeUppercase) chars += uppercaseChars;
  if (includeLowercase) chars += lowercaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSymbols) chars += symbolChars;

  if (chars === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  document.getElementById("passwordOutput").textContent = password;
  updateStrength(password);
}

function updateStrength(password) {
  let strength = 0;
  const strengthText = document.getElementById("strengthText");
  const strengthBar = document.getElementById("strengthBar");

  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

  strengthBar.style.width = strength + "%";

  if (strength < 50) {
    strengthText.textContent = "Password Strength: Weak";
    strengthBar.className = "strength-bar-fill weak";
  } else if (strength < 80) {
    strengthText.textContent = "Password Strength: Medium";
    strengthBar.className = "strength-bar-fill medium";
  } else {
    strengthText.textContent = "Password Strength: Strong";
    strengthBar.className = "strength-bar-fill strong";
  }
}

function copyPassword() {
  const password = document.getElementById("passwordOutput").textContent;

  if (password === "Click Generate") {
    alert("Generate a password first!");
    return;
  }

  navigator.clipboard.writeText(password).then(() => {
    showNotification();
  });
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Generate a password on page load
window.onload = function () {
  generatePassword();
};
