const BASE_URL = 'https://superheroapi.com/api.php';
const API_KEY = '';

function getRandom() {
    return Math.floor(Math.random() * 731) + 1;
}

window.onload = function () {
    const heroNumbers = [1, 2];
    const heroPromises = heroNumbers.map(heroNumber => this.getAndShowHero(getRandom(), heroNumber));

    Promise.all(heroPromises)
        .then(([hero1Stats, hero2Stats]) => {
            compareAndUpdateBorders(1, hero1Stats, 2, hero2Stats);
            compareAndUpdateBorders(2, hero2Stats, 1, hero1Stats);
        });
}

function getAndShowHero(id, heroNumber) {
    const url = `${BASE_URL}/${API_KEY}/${id}`;

    return new Promise((resolve, reject) => {
        callAPI(url, function (status, data) {
            let name = data.name;
            let intelligence = data.powerstats.intelligence !== "null" ? parseInt(data.powerstats.intelligence) : 0;
            let strength = data.powerstats.strength !== "null" ? parseInt(data.powerstats.strength) : 0;
            let speed = data.powerstats.speed !== "null" ? parseInt(data.powerstats.speed) : 0;
            let durability = data.powerstats.durability !== "null" ? parseInt(data.powerstats.durability) : 0;
            let power = data.powerstats.power !== "null" ? parseInt(data.powerstats.power) : 0;
            let combat = data.powerstats.combat !== "null" ? parseInt(data.powerstats.combat) : 0;
            let image = data.image.url;

            const totalStats = intelligence + strength + speed + durability + power + combat;

            const heroElement = `
            <article id='hero${heroNumber}'>
                <img src='${image}'/>
                <h1>${name}</h1>
                <p> Intelligence: <span style ='width:${intelligence}%; background-color: #F98B32'></span></p>
                <p> Strength: <span style ='width:${strength}%; background-color: #FF7C6C'></span></p>
                <p> Speed: <span style ='width:${speed}%; background-color: #22A7F0'></span></p>
                <p> Durability: <span style ='width:${durability}%; background-color: #3EDC81'></span></p>
                <p> Power: <span style ='width:${power}%; background-color: #AB69C6'></span></p>
                <p> Combat: <span style ='width:${combat}%; background-color: #9CAAB9'></span></p>
            </article>
        `;

            document.getElementById("content").innerHTML += heroElement;

            resolve(totalStats);
        });
    });
}

function compareAndUpdateBorders(heroNumber, totalStats, otherHeroNumber, otherHeroTotalStats) {
    const otherHero = document.getElementById('hero' + otherHeroNumber);
    const currentHero = document.getElementById('hero' + heroNumber);

    if (otherHero && currentHero) {
        if (totalStats > otherHeroTotalStats) {
            currentHero.style.border = '8px solid green';
            otherHero.style.border = '8px solid red';
        } else if (totalStats < otherHeroTotalStats) {
            otherHero.style.border = '8px solid green';
            currentHero.style.border = '8px solid red';
        } else {
            otherHero.style.border = '8px solid yellow';
            currentHero.style.border = '8px solid yellow';
        }
    }
}

function callAPI(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(xhr.status, xhr.response);
        } else {
            alert("Problems connecting to the server.")
        }
    }
    xhr.onerror = function () {
        alert("Network error.");
    }
    xhr.send();
}




