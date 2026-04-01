const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "Light";
        themeBtn.classList.remove("bg-white");
        themeBtn.classList.add("bg-gray-900");
        themeBtn.classList.remove("text-black");
        themeBtn.classList.add("text-white");
    } else {
        themeBtn.textContent = "Dark";
        themeBtn.classList.remove("bg-gray-900");
        themeBtn.classList.add("bg-white");
        themeBtn.classList.remove("text-white");
        themeBtn.classList.add("text-black");
    }
});

function updateTime() {
    const date = new Date();
    hours.textContent = date.getHours();
    minutes.textContent = date.getMinutes();
    seconds.textContent = date.getSeconds();
}

setInterval(updateTime, 1000);  