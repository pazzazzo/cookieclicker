const cookieHTML = document.getElementById("cookie")
const cookieNumberHTML = document.getElementById("cookie-number")
const cookieFrequencyHTML = document.getElementById("cookie-frequency")
const cookieFountainHTML = document.getElementById("cookie-fountain")
const rightHTML = document.getElementById("right")

let cookieFountainSpeed = 3
let cookiesImg = new Set()
let cookiesNumber = 0
let precCookies = 0
let frequency = 0

setInterval(() => {
    cookieFrequencyHTML.innerHTML = `${precCookies} cookies/s`
    frequency = precCookies
    precCookies = 0
}, 1000);

let upgrades = [
    {
        "name": "Curseur",
        "image": "cursor.png",
        "cost": 30,
        "level": 0,
        "intervalID": 0,
        "cost_multiplicator": 1.2
    }
]

upgrades.forEach((upgrade, i) => {
    let innerHTML = `<div class="item"><div class="item-blur" id="item-${i}" onclick="upgradeClick(${i}, this)"></div><img src="./media/${upgrade.image}" alt="" class="item-icon"><div class="item-data"><div class="item-name">${upgrade.name}</div><div class="item-cost">${upgrade.cost}</div></div></div>`
    rightHTML.innerHTML += innerHTML
})

function upgradeClick(i, element) {
    let upgrade = upgrades[i]
    if (cookiesNumber >= upgrade.cost) {
        cookiesNumber -= upgrade.cost
        upgrade.cost = Math.floor(upgrade.cost * upgrade.cost_multiplicator)
        element.parentElement.querySelector(".item-cost").innerHTML = upgrade.cost
    }
    switch (i) {
        case 0:
            upgrade.level++
            if (upgrade.level > 1) {
                clearInterval(upgrade.intervalID)
            }

            upgrade.intervalID = setInterval(() => {
                cookieClick()
            }, 1000 / upgrade.level);
            break;
        default:
            break;
    }
}

function rdm(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function rdmCookie() {
    let img = document.createElement("img")
    img.src = "./media/cookie.png"
    img.style.transform = `rotate(${rdm(0, 360)}deg)`
    img.classList.add("cookie")
    img.style.top = "-134px"
    img.style.left = `${rdm(0, cookieFountainHTML.clientWidth)*0.9}px`
    cookiesImg.add([img, 0])
    cookieFountainHTML.appendChild(img)
}

// function upgrade(type, element) {
//     console.log(element.parentElement.querySelector(".item-cost").innerHTML);
// }

function anim() {
    requestAnimationFrame(anim)
    cookieFountainSpeed = cookiesImg.size + 1
    cookieNumberHTML.innerText = cookiesNumber
    cookiesImg.forEach(cookie => {
        cookie[1]+=cookieFountainSpeed
        cookie[0].style.top = `${cookie[1]}px`
        if (cookie[1] > cookieFountainHTML.clientHeight) {
            cookie[0].remove()
            cookiesImg.delete(cookie)
        }
    })
    upgrades.forEach((upgrade, i) => {
        if (cookiesNumber >= upgrade.cost) {
            document.getElementById("item-" + i).classList.add("ready")
        } else {
            document.getElementById("item-" + i).classList.remove("ready")
        }
    })
}
anim()


cookieHTML.addEventListener("click", cookieClick)

function cookieClick() {
    cookiesNumber++
    precCookies++
    rdmCookie()
    if (cookiesNumber === 69) {
        document.title = "Cookie Clicker B-)"
    } else if (document.title === "Cookie Clicker B-)") {
        document.title = "Cookie Clicker"
    }
}