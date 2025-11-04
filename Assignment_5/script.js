"use strict";

// Emergency services array, with name, number, icon filename, category, and description
const emergencyServices = [
  {
    name: "National Emergency Number",
    number: "999",
    icon: "police.png",
    category: "All",
    description: "National Emergency",
    iconClass: "icon-default",
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
    icon: "police.png",
    category: "Help",
    description: "Women & Child Helpline",
    iconClass: "icon-default",
  },
  {
    name: "Anti-Corruption Helpline",
    number: "106",
    icon: "police.png",
    category: "Govt.",
    description: "Anti-Corruption",
    iconClass: "icon-default",
  },
  {
    name: "Electricity Helpline",
    number: "16216",
    icon: "police.png",
    category: "Electricity",
    description: "Electricity Outage",
    iconClass: "icon-default",
  },
  {
    name: "Brac Helpline",
    number: "16445",
    icon: "police.png",
    category: "NGO",
    description: "Brac",
    iconClass: "icon-default",
  },
  {
    name: "Bangladesh Railway Helpline",
    number: "163",
    icon: "Bangladesh-Red.png",
    category: "Travel",
    description: "Bangladesh Railway",
    iconClass: "icon-railway",
  },
];

// DOM Selectors
const cardsSection = document.getElementById("cardsSection");
const historyList = document.getElementById("historyList");
const heartCountSpan = document.getElementById("heartCount");
const coinCountSpan = document.getElementById("coinCount");
const copyCounterBtn = document.getElementById("copyCounterBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// State variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 2;
let callHistory = [];

// Format time as Bangla-style time indicator (simple AM/PM here)
function formatTime(date) {
  // Using toLocaleTimeString with options
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Creates a single card DOM node for a service
function createCard(service) {
  const card = document.createElement("article");
  card.classList.add("card");

  // Heart button (favorite)
  const heartBtn = document.createElement("button");
  heartBtn.classList.add("btn-heart");
  heartBtn.title = "Heart";
  heartBtn.innerHTML = `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3 5.48 5.48 0 0 1 12 6.28 5.48 5.48 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
  </svg>`;
  card.appendChild(heartBtn);

  heartBtn.addEventListener("click", () => {
    heartCount++;
    heartCountSpan.textContent = heartCount;
    heartBtn.classList.toggle("favorited");
  });

  // Icon Circle with image
  const iconCircle = document.createElement("div");
  iconCircle.className = `card-icon-circle ${service.iconClass || "icon-default"}`;
  const iconImg = document.createElement("img");
  iconImg.src = `IMAGES/${service.icon}`;
  iconImg.alt = service.name + " Icon";
  iconImg.className = "icon-image";
  iconCircle.appendChild(iconImg);
  card.appendChild(iconCircle);

  // Card name and description
  const nameHeading = document.createElement("h3");
  nameHeading.textContent = service.name;
  card.appendChild(nameHeading);

  const descriptionPar = document.createElement("p");
  descriptionPar.textContent = service.description;
  descriptionPar.className = "description";
  card.appendChild(descriptionPar);

  // Number display
  const numberDiv = document.createElement("div");
  numberDiv.className = "number";
  numberDiv.textContent = service.number;
  card.appendChild(numberDiv);

  // Category Tag
  const categoryTag = document.createElement("span");
  categoryTag.className = "category-tag";
  categoryTag.textContent = service.category;
  card.appendChild(categoryTag);

  // Buttons container
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  // Copy Button
  const copyBtn = document.createElement("button");
  copyBtn.className = "btn-copy";
  copyBtn.innerHTML = `
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 1H4c-1.104 0-2 .896-2 2v14h2V3h12V1zm3 4H8c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h11c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2zm0 18H8V7h11v16z"/>
    </svg>
    Copy`;
  btnGroup.appendChild(copyBtn);

  // Call Button
  const callBtn = document.createElement("button");
  callBtn.className = "btn-call";
  callBtn.innerHTML = `
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.21a1 1 0 0 1 1.11-.21c1.21.48 2.53.75 3.9.75a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1c-9.94 0-18-8.06-18-18a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.37.27 2.69.75 3.9a1 1 0 0 1-.21 1.11l-2.2 2.2z"/>
    </svg>
    Call`;
  btnGroup.appendChild(callBtn);

  card.appendChild(btnGroup);

  // Copy button event logic
  copyBtn.addEventListener("click", () => {
    // Copy number to clipboard
    navigator.clipboard.writeText(service.number).then(() => {
      copyCount++;
      updateCopyCount();
      copyBtn.textContent = "Copied";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.disabled = false;
      }, 1500);
    });
  });

  // Call button event logic
  callBtn.addEventListener("click", () => {
    if (coinCount < 20) {
      alert("Not enough coins to make a call. Please earn more coins.");
      return;
    }
    coinCount -= 20;
    updateCoinCount();

    alert(`Calling ${service.name} at number ${service.number}...`);

    // Add call to history with current time
    const callTime = formatTime(new Date());
    addCallHistory({
      name: service.name,
      number: service.number,
      time: callTime,
    });
  });

  return card;
}

// Update coin count on UI and color logic (red if coins < 20)
function updateCoinCount() {
  coinCountSpan.textContent = coinCount;
  if (coinCount < 20) {
    coinCountSpan.parentElement.style.color = "#dc3545"; // red
  } else {
    coinCountSpan.parentElement.style.color = "#222";
  }
}

// Update copy count text and button label
function updateCopyCount() {
  copyCounterBtn.textContent = `${copyCount} Copy`;
}

// Add call to call history list and update UI
function addCallHistory(callEntry) {
  callHistory.unshift(callEntry); // add newest to front

  renderCallHistory();
}

// Render the call history list UI
function renderCallHistory() {
  historyList.innerHTML = ""; // Clear current list

  // Render each item
  callHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = entry.name + " Number";

    const numberSpan = document.createElement("span");
    numberSpan.textContent = entry.number;

    const timeDiv = document.createElement("div");
    timeDiv.className = "history-time";
    timeDiv.textContent = entry.time;

    li.appendChild(nameSpan);
    li.appendChild(numberSpan);
    li.appendChild(timeDiv);

    historyList.appendChild(li);
  });
}

// Clear history button click
clearHistoryBtn.addEventListener("click", () => {
  callHistory = [];
  renderCallHistory();
});

// Initialize app cards
function init() {
  emergencyServices.forEach((service) => {
    const card = createCard(service);
    cardsSection.appendChild(card);
  });

  updateCoinCount();
  updateCopyCount();
}

init();