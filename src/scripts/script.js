const emojis = [
  "🍄",
  "🍄",
  "🐻", 
  "🐻", 
  "🦄", 
  "🦄", 
  "🙉", 
  "🙉", 
  "🐰", 
  "🐰", 
  "🐍", 
  "🐍", 
  "🐩", 
  "🐩", 
  "🦊", 
  "🦊"
];
let openCards = [];
let timer;
let gameOver = false; 


function startTimer() {
  timer = setTimeout(() => {
    if (!gameOver) {
      alert("Você perdeu! O tempo acabou.");
      resetGame(); 
    }
  }, 60000); 
}


function resetGame() {
  
  openCards = [];
  document.querySelectorAll(".boxOpen, .boxMatch").forEach(card => {
    card.classList.remove("boxOpen", "boxMatch");
  });
  
  shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
  const items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].innerHTML = shuffleEmojis[i];
  }

  clearTimeout(timer); 
  startTimer(); 
}

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}


startTimer();

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    gameOver = true; 
    clearTimeout(timer); 
    alert("Você venceu !");
  }
}

  
  