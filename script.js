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
let cangold = true;
let cookiesStrenth = 1

setInterval(() => {
    frequency = precCookies
    cookieFrequencyHTML.innerHTML = `${frequency} cookies/s`
    precCookies = 0
}, 1000);

let upgrades = [

    {
        "name": "+1",
        "image": "plus1.png",
        "cost": 20,
        "level": 0,
        "intervalID": 0,
        "cost_multiplicator": 2
    },
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
        upgrade.level++
    } else {
        return
    }
    switch (upgrade.name) {
        case "Curseur":
            if (upgrade.level > 1) {
                clearInterval(upgrade.intervalID)
            }
            upgrade.intervalID = setInterval(() => {
                cookieClick()
            }, 1000 / upgrade.level);
            break;
        case "+1":
            cookiesStrenth++
            break;
        default:
            break;
    }
}

function rdm(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function goldclick(event) {
    event.target.remove()
    cangold = false
    let max = rdm(50, 150)
    cookieFrequencyHTML.classList.add("gold")
    cookieNumberHTML.classList.add("gold")
    for (let i = 0; i < max; i++) {
        setTimeout(() => {
            cookieClick()
            if (i === max - 1) {
                cangold = true
                cookieNumberHTML.classList.remove("gold")
                cookieFrequencyHTML.classList.remove("gold")
            }
        }, i * 60);
    }
}

function rdmCookie() {
    let img = document.createElement("img")
    let isgolden = false
    if (rdm(0, 100 + frequency * 5) === 0 && cangold) {
        img.src = "./media/gold-cookie.png"
        img.onmousedown = goldclick
        isgolden = true
        img.classList.add("gold")
    } else {
        img.src = "./media/cookie.png"
    }
    img.draggable = false
    img.style.transform = `rotate(${rdm(0, 360)}deg)`
    img.classList.add("cookie")
    img.style.top = "-134px"
    img.style.left = `${rdm(0, cookieFountainHTML.clientWidth) * 0.85}px`
    cookiesImg.add([img, 0, isgolden])
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
        cookie[1] += (cookie[2] ? 10 : cookieFountainSpeed)
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
    cookiesNumber += cookiesStrenth
    precCookies += cookiesStrenth
    for (let i = 0; i < cookiesStrenth; i++) {
        rdmCookie()
    }
    if (cookiesNumber === 69) {
        document.title = "Cookie Clicker B-)"
    } else if (document.title === "Cookie Clicker B-)") {
        document.title = "Cookie Clicker"
    }
}