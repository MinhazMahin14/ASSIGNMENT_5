"use strict";

const emergencyServices = [
  { name: "National Emergency Number", number: "999", icon: "emergency.png", category: "All", description: "National Emergency", iconClass: "icon-police" },



  { name: "Police Helpline Number", number: "999", icon: "police.png", category: "Police", description: "Police", iconClass: "icon-police" },



  { name: "Fire Service Number", number: "999", icon: "fire-service.png", category: "Fire", description: "Fire Service", iconClass: "icon-fire" },



  { name: "Ambulance Service", number: "1994-999999", icon: "ambulance.png", category: "Health", description: "Ambulance", iconClass: "icon-ambulance" },



  { name: "Women & Child Helpline", number: "109", icon: "police.png", category: "Help", description: "Women & Child Helpline", iconClass: "icon-police" },

  { name: "Anti-Corruption Helpline", number: "106", icon: "police.png", category: "Govt.", description: "Anti-Corruption", iconClass: "icon-police" },

  { name: "Electricity Helpline", number: "16216", icon: "police.png", category: "Electricity", description: "Electricity Outage", iconClass: "icon-police" },



  { name: "Brac Helpline", number: "16445", icon: "brac.png", category: "NGO", description: "Brac", iconClass: "icon-police" },







  { name: "Bangladesh Railway Helpline", number: "163", icon: "Bangladesh-Railway.png", category: "Travel", description: "Bangladesh Railway", iconClass: "icon-railway" },
];


// DOM
const cardsContainer = document.getElementById("cardsContainer");


const historyList = document.getElementById("historyList");


const heartCounter = document.querySelector(".heart-counter");


const coinCounter = document.querySelector(".coin-counter");


const copyCounterBtn = document.getElementById("copyCounterBtn");


const clearHistoryBtn = document.getElementById("clearHistoryBtn");



// State
let hearts = 0;
let coins = 100;
let copyCount = 0;
let callHistory = [];

// Helper: time format
function formatTime(date = new Date()) {
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",

    minute: "2-digit",

    second: "2-digit",
  });
}

// Create a card

function createCard(service) {
  const card = document.createElement("article");
  card.classList.add("card");

  // Wishlist button

  const wishlistBtn = document.createElement("button");
  wishlistBtn.className = "wishlist-btn";
  wishlistBtn.innerHTML = "♡";
  card.appendChild(wishlistBtn);

  wishlistBtn.addEventListener("click", () => {
    if (wishlistBtn.classList.contains("active")) {
      wishlistBtn.classList.remove("active");
      wishlistBtn.innerHTML = "♡";
      hearts--;
    } else {
      wishlistBtn.classList.add("active");
      wishlistBtn.innerHTML = "♥";
      hearts++;
    }
    heartCounter.textContent = hearts;
  });

  // Icon
  const iconContainer = document.createElement("div");
  iconContainer.className = `card-icon-container ${service.iconClass}`;
  const iconImg = document.createElement("img");

  iconImg.className = "card-icon";
  iconImg.src = `IMAGES/${service.icon}`;
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

  const num = document.createElement("div");
  num.className = "card-number";
  num.textContent = service.number;
  card.appendChild(num);



  // Category

  const tag = document.createElement("span");
  tag.className = "category-tag";
  tag.textContent = service.category;
  card.appendChild(tag);

  // Buttons
  const btnsDiv = document.createElement("div");
  btnsDiv.className = "buttons-container";




  // Copy
  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-button";
  copyBtn.textContent = "Copy";
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(service.number).then(() => {
      copyCount++;
      updateCopyCounter();
      copyBtn.textContent = "Copied";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.disabled = false;
      }, 1500);
    });
  });
  btnsDiv.appendChild(copyBtn);



  // Call
  const callBtn = document.createElement("button");

  callBtn.className = "call-button";
  callBtn.textContent = "Call";
  callBtn.addEventListener("click", () => {
    if (coins < 20) {
      alert("You don't have enough coins to make a call.");
      return;
    }
    coins -= 20;
    updateCoinCounter();
    alert(`Calling ${service.name} at number: ${service.number}`);
    addToHistory({ name: service.name, number: service.number, time: formatTime() });
  });
  btnsDiv.appendChild(callBtn);

  card.appendChild(btnsDiv);
  return card;
}


// Update counters
function updateCoinCounter() {
  coinCounter.innerHTML = `${coins} <img src="IMAGES/coin.png" alt="Coin" class="icon-coin" />`;
  coinCounter.style.color = coins < 20 ? "#dc3545" : "";
}


function updateCopyCounter() {
  copyCounterBtn.textContent = copyCount + " Copy";
}

// History


function addToHistory(call) {
  callHistory.unshift(call);
  if (callHistory.length > 25) callHistory.pop();
  renderHistory();
}



function renderHistory() {
  historyList.innerHTML = "";
  callHistory.forEach((call) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `<span>${call.name} Number</span>
                    <span>${call.number}</span>
                    <span class="call-time">${call.time}</span>`;
    historyList.appendChild(li);
  });
}


// Clear history

clearHistoryBtn.addEventListener("click", () => {
  callHistory = [];
  renderHistory();
});


// Init


function init() {
  emergencyServices.forEach((s) => cardsContainer.appendChild(createCard(s)));
  updateCoinCounter();
  updateCopyCounter();
}
init();
