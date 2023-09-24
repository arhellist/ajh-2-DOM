const soundFirstBlood = new Audio("./sound/firstblood.mp3");
const soundHeadshot = new Audio("./sound/headshot.mp3");
const soundDoublekill = new Audio("./sound/doublekill.mp3");
const soundTriplekill = new Audio("./sound/triplekill.mp3");
const soundMonsterkill = new Audio("./sound/monsterkill.mp3");
const soundMultikill = new Audio("./sound/multikill.mp3");
const soundUltrakill = new Audio("./sound/ultrakill.mp3");
const soundWinner = new Audio("./sound/winner.mp3");
const soundFire = new Audio("./sound/fire.mp3");
const soundMiss = new Audio("./sound/windowclose.mp3");
const soundScream = new Audio("./sound/deathc51.mp3");
const soundLoose = new Audio("./sound/deathc53.mp3");
const sell = document.querySelectorAll(".sell");
const hitValue = document.querySelector(".hit-value");
const missValue = document.querySelector(".miss-value");

let hit = 0;
let miss = 0;
let start = null;

let hitCounter = 0;
let hitBoll = undefined;

function run() {
  start = setInterval(() => {
    let rnd = Math.floor(Math.random() * sell.length);
    setTimeout(() => {
      sell[rnd].classList.remove("activeSell");
    }, 500);
    sell[rnd].classList.add("activeSell");
  }, 1520);
}

function restart() {
  hitValue.textContent = 0;
  missValue.textContent = 0;
  hit = 0;
  miss = 0;
  hitCounter = 0;
  hitBoll = undefined;
  sell.forEach((item) => {
    item.classList.remove("looseSell");
    item.classList.remove("winSell");
  });
  run();
}
restart();

function clickListener() {
  // Обработчик События нажатия кнопки
  sell.forEach((item) => {
    item.addEventListener("click", () => {
      // если попал в гнома то + 1
      if (item.classList.contains("activeSell")) {
        item.classList.remove("activeSell");
        item.classList.add("bloodSell");
        hit += 1;
        hitValue.textContent = hit;

        // Обработка оудио
        if (hitCounter === 0 && hitBoll === undefined) {
          soundFirstBlood.play();
          hitCounter += 1;
          hitBoll = true;
        } else if (hitCounter === 0 && hitBoll === false) {
          soundHeadshot.play();
          hitCounter += 1;
          hitBoll = true;
        } else if (hitCounter === 1 && hitBoll === true) {
          soundDoublekill.play();
          hitCounter += 1;
        } else if (hitCounter === 2 && hitBoll === true) {
          soundTriplekill.play();
          hitCounter += 1;
        } else if (hitCounter === 3 && hitBoll === true) {
          soundMultikill.play();
          hitCounter += 1;
        } else if (hitCounter === 4 && hitBoll === true) {
          soundMonsterkill.play();
          hitCounter += 1;
        } else if (hitCounter === 5 && hitBoll === true) {
          soundUltrakill.play();
          hitCounter += 1;
        } else if (hitCounter === 6 && hitBoll === true) {
          soundScream.play();
          hitCounter += 1;
        } else if (hitCounter > 6 && hitBoll === true) {
          soundFire.play();
          hitCounter += 1;
        }

        setTimeout(() => {
          item.classList.remove("bloodSell");
        }, 150);

        // если попал 10 раз то победил
        if (hit === 10) {
          clearInterval(start);
          console.log("Удален " + start);
          soundWinner.play();
          sell.forEach((item) => {
            item.classList.add("winSell");
          });
          setTimeout(() => {
            restart();
          }, 3000);
        }
      } else {
        // если промазал
        item.classList.remove("activeSell");
        item.classList.add("missSell");
        miss += 1;
        missValue.textContent = miss;
        soundMiss.play();
        hitBoll = false;
        hitCounter = 0;
        setTimeout(() => {
          item.classList.remove("missSell");
        }, 250);

        if (miss === 10) {
          clearInterval(start);
          console.log("Удален " + start);
          soundLoose.play();
          sell.forEach((item) => {
            item.classList.add("looseSell");
          });
          setTimeout(() => {
            restart();
          }, 3000);
        }
      }
    });
  });
}
clickListener();
