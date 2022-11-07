const BGs = [
  "csharp.png",
  "java.jpg",
  "nodejs.jpg",
  "php.png",
  "Python.png",
  "cplus.png",
  "android.jpg",
  "devops.png",
];

let firstCard = null;
let isBlocked = false;

const settings = {
  width: 4,
  height: 3,
};

const bannerBg = "banner.jpg";

const gameField = document.getElementById("game-field");

const banner = document.createElement("img");
banner.setAttribute("src", "img/banner.jpg");
banner.classList.add("banner");

const gameHeader = document.getElementById("game-header");
gameHeader.after(banner);
let cardsCount = null;

function handleCardClick(event) {
  if (!isBlocked) {
    const cell = event.currentTarget;
    const bg = cell.dataset.bg;
    cell.style.backgroundImage = `url(img/${bg})`;
    cell.classList.toggle("open");
    if (!firstCard) {
      firstCard = {
        card: cell,
        bg,
      };
    } else {
      if (firstCard.bg === bg) {
        cardsCount -= 2;
        firstCard = null;
      } else {
        setTimeout(function () {
          isBlocked = true;
          cell.classList.toggle("open");
          firstCard.card.classList.toggle("open");
          cell.style.backgroundImage = "";
          firstCard.card.style.backgroundImage = "";
          firstCard = null;
          isBlocked = false;
        }, 400);
      }
    }

    setTimeout(function () {
      if (cardsCount === 0) {
        gameField.innerHTML = "<h2>Вы победили !</h2>";
      }
    }, 600);
  }
}

function handleStartButtonClick() {
  cardsCount = settings.width * settings.height;
  gameField.innerHTML = "";

  const usedBg = [];

  const cardsBgs = [];

  const randomBgs = BGs.sort(() => Math.random() - 0.5);

  for (let i = 0; i < cardsCount; i++) {
    let selectedBg;

    if (i < cardsCount / 2) {
      selectedBg = randomBgs[i];
      usedBg.push(selectedBg);
    } else {
      selectedBg = usedBg.pop(); // ????
    }

    cardsBgs.push(selectedBg);
  }
  //   cardsBgs.sort(() => Math.random() - 0.5);

  let iterator = 0;

  for (let i = 0; i < settings.height; i++) {
    // создаем столбцы
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < settings.width; j++) {
      // создаем строки
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.bg = cardsBgs[iterator];

      card.addEventListener("click", handleCardClick);

      row.appendChild(card); // appendChild  вставляет в конец элемента
      iterator++; // каждое выполнение цикла
    }

    gameField.appendChild(row); // поместить в игровое поле строку.
  }
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", handleStartButtonClick);
