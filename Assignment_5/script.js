const services = [
  {
    name: "National Emergency Number",
    subtitle: "National Emergency",
    number: "999",
    category: "All",
    icon: "lock.png",
    iconBgClass: "icon-container",
  },
  {
    name: "Police Helpline Number",
    subtitle: "Police",
    number: "999",
    category: "Police",
    icon: "police.png",
    iconBgClass: "icon-container police",
  },
  {
    name: "Fire Service Number",
    subtitle: "Fire Service",
    number: "999",
    category: "Fire",
    icon: "fire-service.png",
    iconBgClass: "icon-container fire",
  },
  {
    name: "Ambulance Service",
    subtitle: "Ambulance",
    number: "1994-999999",
    category: "Health",
    icon: "ambulance.png",
    iconBgClass: "icon-container ambulance",
  },
  {
    name: "Women & Child Helpline",
    subtitle: "Women & Child Helpline",
    number: "109",
    category: "Help",
    icon: "lock.png",
    iconBgClass: "icon-container",
  },
  {
    name: "Anti-Corruption Helpline",
    subtitle: "Anti-Corruption",
    number: "106",
    category: "Govt.",
    icon: "lock.png",
    iconBgClass: "icon-container",
  },
  {
    name: "Electricity Helpline",
    subtitle: "Electricity Outage",
    number: "16216",
    category: "Electricity",
    icon: "lock.png",
    iconBgClass: "icon-container",
  },
  {
    name: "Brac Helpline",
    subtitle: "Brac",
    number: "16445",
    category: "NGO",
    icon: "lock.png",
    iconBgClass: "icon-container",
  },
  {
    name: "Bangladesh Railway Helpline",
    subtitle: "Bangladesh Railway",
    number: "163",
    category: "Travel",
    icon: "lock.png",
    iconBgClass: "icon-container",
  },
];

// DOM References:
const heartCountEl = document.getElementById("heart-count");
const coinCountEl = document.getElementById("coin-count");
const copyCountEl = document.getElementById("copy-count");
const cardsContainer = document.getElementById("cards-container");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");

let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

function updateCounters() {
  heartCountEl.textContent = heartCount;
  coinCountEl.textContent = coinCount;
  copyCountEl.textContent = `${copyCount} Copy`;

  if (coinCount < 20) {
    coinCountEl.style.color = "#e33e3e";
  } else {
    coinCountEl.style.color = "#146432";
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: true });
}

function createCard(service) {
  const card = document.createElement("article");
  card.className = "card";

  const iconContainer = document.createElement("div");
  iconContainer.className = service.iconBgClass;
  const iconImg = document.createElement("img");
  iconImg.className = "card-icon";
  iconImg.src = `IMAGES/${service.icon}`;
  iconImg.alt = service.name + " icon";
  iconContainer.appendChild(iconImg);
  card.appendChild(iconContainer);

  // Heart icon (static as in image)
  const heartSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heartSVG.setAttribute("class", "heart-icon");
  heartSVG.setAttribute("viewBox", "0 0 24 24");
  heartSVG.innerHTML = `
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
    2 5.41 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
    C13.09 3.81 14.76 3 16.5 3 
    19.58 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  `;
  card.appendChild(heartSVG);

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = service.name;
  card.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "card-subtitle";
  subtitle.textContent = service.subtitle;
  card.appendChild(subtitle);

  const number = document.createElement("p");
  number.className = "card-number";
  number.textContent = service.number;
  card.appendChild(number);

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = service.category;
  card.appendChild(category);

  // Buttons container
  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const btnCopy = document.createElement("button");
  btnCopy.className = "btn-copy";
  btnCopy.innerHTML = `<img src="IMAGES/copy.png" alt="copy" /> Copy`;
  btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(service.number);
      copyCount++;
      updateCounters();
      alert(`Copied: ${service.number}`);
    } catch {
      alert("Copy failed");
    }
  });

  const btnCall = document.createElement("button");
  btnCall.className = "btn-call";
  btnCall.innerHTML = `<img src="IMAGES/phone.png" alt="call" /> Call`;
  btnCall.addEventListener("click", () => {
    if (coinCount < 20) {
      alert("Not enough coins! Minimum 20 required.");
      return;
    }
    coinCount -= 20;
    updateCounters();
    alert(`Calling ${service.name} (${service.number})...`);

    const li = document.createElement("li");
    const leftDiv = document.createElement("div");
    leftDiv.textContent = service.name;
    const spanNum = document.createElement("span");
    spanNum.textContent = service.number;
    leftDiv.appendChild(document.createElement("br"));
    leftDiv.appendChild(spanNum);

    const timeSpan = document.createElement("span");
    timeSpan.textContent = getCurrentTime();

    li.appendChild(leftDiv);
    li.appendChild(timeSpan);
    historyList.prepend(li);
  });

  buttons.appendChild(btnCopy);
  buttons.appendChild(btnCall);

  card.appendChild(buttons);

  return card;
}

function init() {
  services.forEach((service) => {
    cardsContainer.appendChild(createCard(service));
  });

  updateCounters();
}

clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});

init();