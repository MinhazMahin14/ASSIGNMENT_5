"use strict";

const emergencyServices = [
  {
    name: "National Emergency Number",
    number: "999",
    icon: "emergency.png",
    category: "All",
    description: "National Emergency",
    iconClass: "icon-police",
  },
  {
    name: "Police Helpline Number",
    number: "999",
    icon: "police.png",
    category: "Police",
    description: "Police",
    iconClass: "icon-police",
  },
  {
    name: "Fire Service Number",
    number: "999",
    icon: "fire-service.png",
    category: "Fire",
    description: "Fire Service",
    iconClass: "icon-fire",
  },
  {
    name: "Ambulance Service",
    number: "1994-999999",
    icon: "ambulance.png",
    category: "Health",
    description: "Ambulance",
    iconClass: "icon-ambulance",
  },
  {
    name: "Women & Child Helpline",
    number: "109",
    icon: "emergency.png",
    category: "Help",
    description: "Women & Child Helpline",
    iconClass: "icon-police",
  },
  {
    name: "Anti-Corruption Helpline",
    number: "106",
    icon: "emergency.png",
    category: "Govt.",
    description: "Anti-Corruption",
    iconClass: "icon-police",
  },
  {
    name: "Electricity Helpline",
    number: "16216",
    icon: "emergency.png",
    category: "Electricity",
    description: "Electricity Outage",
    iconClass: "icon-police",
  },
  {
    name: "Brac Helpline",
    number: "16445",
    icon: "brac.png",
    category: "NGO",
    description: "Brac",
    iconClass: "icon-police",
  },
  {
    name: "Bangladesh Railway Helpline",
    number: "163",
    icon: "Bangladesh-Railway.png",
    category: "Travel",
    description: "Bangladesh Railway",
    iconClass: "icon-railway",
  },
];

// DOM selectors

const cardsContainer = document.getElementById("cardsContainer");
const historyList = document.getElementById("historyList");
const heartCounter = document.getElementById("heartCount");
const coinCounter = document.getElementById("coinCount");
const copyCounterBtn = document.getElementById("copyCounterBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// State variables

let hearts = 0;
let coins = 100;
let copyCount = 0;
let callHistory = [];


// Keep track of which cards are favorited to handle toggle remove/add
const favoritedCards = new Set(); // store service.name of favorited cards


function formatTime(date = new Date()) {
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}



function createCard(service) {
  const card = document.createElement("article");
  card.classList.add("card");


  // Heart button top right — toggles favorite state and counts
  const heartBtn = document.createElement("button");
  heartBtn.className = "card-heart-btn";
  heartBtn.title = "Add to Favorites";
  heartBtn.innerHTML = `
    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
      stroke-linecap="round" stroke-linejoin="round" height="20" width="20"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.72-7.72 1.06-1.06a5.5 5.5 0 0 0 0-7.82z"></path>
    </svg>`;
  card.appendChild(heartBtn);


  // Toggle favorite on click
  heartBtn.addEventListener("click", () => {
    if (favoritedCards.has(service.name)) {
      // Remove favorite
      favoritedCards.delete(service.name);
      hearts = Math.max(hearts - 1, 0);
      heartBtn.classList.remove("favorited");
    } else {
      // Add favorite
      favoritedCards.add(service.name);
      hearts++;
      heartBtn.classList.add("favorited");
    }
    updateHeartCounter();
  });


  // Icon container
  const iconContainer = document.createElement("div");
  iconContainer.className = `card-icon-container ${service.iconClass ?? ""}`;
  const iconImg = document.createElement("img");
  iconImg.className = "card-icon";
  iconImg.src = `IMAGES/${service.icon}`;
  iconImg.alt = `${service.name} icon`;
  iconContainer.appendChild(iconImg);
  card.appendChild(iconContainer);


  // Title
  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = service.name;
  card.appendChild(title);


  // Description
  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = service.description;
  card.appendChild(desc);



  // Number
  const number = document.createElement("div");
  number.className = "card-number";
  number.textContent = service.number;
  card.appendChild(number);

  // Category Tag
  const tag = document.createElement("span");
  tag.className = "category-tag";
  tag.textContent = service.category;
  card.appendChild(tag);

  // Buttons container
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons-container";



  // Copy Button
  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-button";
  copyBtn.type = "button";
  copyBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" 
      class="feather feather-copy" aria-hidden="true" focusable="false">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    Copy`;
  buttonsDiv.appendChild(copyBtn);



  // Call Button
  const callBtn = document.createElement("button");
  callBtn.className = "call-button";
  callBtn.type = "button";
  callBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="feather feather-phone-call" aria-hidden="true" focusable="false">
      <path d="M15 10l-2-2"></path>
      <path d="M15 10l5 5"></path>
      <path d="M17.22 18.22a16 16 0 0 1-5.45-5.45"></path>
      <path d="M3 10v1a19 19 0 0 0 19 19h1"></path>
      <path d="M8 5l1.5 1.5"></path>
    </svg>
    Call`;
  buttonsDiv.appendChild(callBtn);

  card.appendChild(buttonsDiv);



  // Copy click event
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(service.number).then(() => {
      copyCount++;
      updateCopyCounter();
      copyBtn.textContent = "Copied";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.disabled = false;
      }, 1600);
    });
  });



  // Call click event
  callBtn.addEventListener("click", () => {
    if (coins < 20) {
      alert("You don't have enough coins to make a call.");
      return;
    }
    coins -= 20;
    updateCoinCounter();

    alert(`Calling ${service.name} at number: ${service.number}`);

    addToHistory({
      name: service.name,
      number: service.number,
      time: formatTime(),
    });
  });

  return card;
}

// Update heart count in navbar


function updateHeartCounter() {
  heartCounter.textContent = hearts;
}

// Update coin count and colors


function updateCoinCounter() {
  coinCounter.textContent = coins;
  if (coins < 20) {
    coinCounter.style.color = "#dc3545";
  } else {
    coinCounter.style.color = "";
  }
}

// Update copy count display



function updateCopyCounter() {
  copyCounterBtn.textContent = copyCount + " Copy";
}

// Add call to call history list and rerender



function addToHistory(call) {
  callHistory.unshift(call);
  if (callHistory.length > 25) {
    callHistory.pop();
  }
  renderHistory();
}

// Render call history UI



function renderHistory() {
  historyList.innerHTML = "";
  callHistory.forEach((call) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = call.name + " Number";
    li.appendChild(nameSpan);

    const numberSpan = document.createElement("span");
    numberSpan.className = "call-number";
    numberSpan.textContent = call.number;
    li.appendChild(numberSpan);

    const timeSpan = document.createElement("span");
    timeSpan.className = "call-time";
    timeSpan.textContent = call.time;
    li.appendChild(timeSpan);

    historyList.appendChild(li);
  });
}

// Clear history button event



clearHistoryBtn.addEventListener("click", () => {
  callHistory = [];
  renderHistory();
});

function formatTime(date = new Date()) {
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}


// Initialize app



function init() {
  emergencyServices.forEach((service) => {
    cardsContainer.appendChild(createCard(service));
  });

  updateHeartCounter();
  updateCoinCounter();
  updateCopyCounter();
}

init();