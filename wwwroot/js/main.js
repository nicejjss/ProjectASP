let index = 0;
var rolar = true;
const sliderNumber = document.querySelectorAll(".banner-left-content__top-link");
const balls = document.querySelector(".banner-left-content__bottom-pagination");

for (let i = 0; i < sliderNumber.length; i++) {
    const div = document.createElement("div");
    div.id = i;
    balls.appendChild(div);
}
document.getElementById("0").classList.add("banner-circle-fill")

var pos = document.querySelectorAll(".banner-left-content__bottom-pagination div")

for (let i = 0; i < pos.length; i++) {
    pos[i].addEventListener('click', () => {
        index = pos[i].id;
        document.querySelector(".banner-left-content__top").style.right = index * 100 + "%";
        document.querySelector(".banner-circle-fill").classList.remove("banner-circle-fill");
        document.getElementById(index).classList.add("banner-circle-fill");
    });
}

function sliderAuto() {
    index = index + 1;
    if (index > sliderNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".banner-left-content__top").style.right = index * 100 + "%";
    document.querySelector(".banner-circle-fill").classList.remove("banner-circle-fill");
    document.getElementById(index).classList.add("banner-circle-fill");
}

setInterval(sliderAuto, 3000)

// Slider Category
const btnRightTwo = document.querySelector(".fa-arrow-right");
const btnLeftTwo = document.querySelector(".fa-arrow-left");
const categoryNumberTwo = document.querySelectorAll(".category-content-list");

btnRightTwo.addEventListener('click', () => {
    index = index + 1;
    if (index > categoryNumberTwo.length - 1) {
        index = 0;
    }
    document.querySelector(".category-content").style.right = index * 100 + "%";
});

btnLeftTwo.addEventListener('click', () => {
    index = index + 1;
    if (index > categoryNumberTwo.length - 1) {
        index = 0;
    }
    document.querySelector(".category-content").style.right = index * 100 + "%";
});

// Toast
function toast({ title = "", msg = "", type = "", duration = 3000}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement("div");
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = (e) => {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: 'uil uil-check-circle',
            error: 'uil uil-exclamation-triangle'
        };

        icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${msg}</p>
            </div>
            <div class="toast__close">
                <i class="uil uil-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}