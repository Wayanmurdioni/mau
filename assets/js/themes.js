const backgrounds = [
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/1.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/2.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/3.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/4.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/5.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/6.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/7.jpg',
    'https://raw.githubusercontent.com/jaka2m/mau/kepo/assets/img/8.jpg'
];

const icons = [
    'fa-sun', 'fa-moon', 'fa-star', 'fa-cloud', 'fa-snowflake', 'fa-rain', 'fa-sun', 'fa-moon'
];

let currentThemeIndex = 0;
let currentIconIndex = 0;

const change = document.querySelector("#switch");
const themeIcon = document.querySelector("#theme-icon");

change.addEventListener("click", changeTheme);

function changeTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % backgrounds.length;
    currentIconIndex = (currentIconIndex + 1) % icons.length;

    document.body.style.background = `url('${backgrounds[currentThemeIndex]}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    themeIcon.className = `fas ${icons[currentIconIndex]}`;

    // Add rotate class
    change.classList.add("rotate");

    // Remove rotate class after animation ends
    setTimeout(() => {
        change.classList.remove("rotate");
    }, 1000); // Match the duration of the CSS animation
}
