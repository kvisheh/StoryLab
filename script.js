let numPlayers = 0;
let currentPlayer = 1;
let playersData = [];

// DOM elements
const setupDiv = document.getElementById("setup");
const shareDiv = document.getElementById("shareLink");
const gameLinkInput = document.getElementById("gameLink");
const playerFormDiv = document.getElementById("playerForm");
const playerNumSpan = document.getElementById("playerNum");
const madlibForm = document.getElementById("madlib-form");
const storyContainer = document.getElementById("storyContainer");
const storyEl = document.getElementById("story");
const restartBtn = document.getElementById("restart");

// Start game
document.getElementById("startGame").addEventListener("click", function() {
    numPlayers = parseInt(document.getElementById("numPlayers").value, 10);
    if (isNaN(numPlayers) || numPlayers < 2) {
        alert("لطفاً یک عدد معتبر وارد کنید (حداقل 2 نفر).");
        return;
    }

    const gameID = Math.random().toString(36).substring(2, 8);
    gameLinkInput.value = `${window.location.href}?game=${gameID}`;

    setupDiv.classList.add("hidden");
    shareDiv.classList.remove("hidden");
    playerFormDiv.classList.remove("hidden");
    playerNumSpan.textContent = currentPlayer;
});

// Handle player form submission
madlibForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const playerData = {
        name: document.getElementById("name").value,
        food: document.getElementById("food").value,
        animal: document.getElementById("animal").value,
        emotion: document.getElementById("emotion").value,
        sound: document.getElementById("sound").value,
        place: document.getElementById("place").value,
        sillyObject: document.getElementById("sillyObject").value,
        action: document.getElementById("action").value,
        friend: document.getElementById("friend").value,
        exclamation: document.getElementById("exclamation").value
    };

    playersData.push(playerData);

    if (currentPlayer < numPlayers) {
        currentPlayer++;
        playerNumSpan.textContent = currentPlayer;
        madlibForm.reset();
    } else {
        displayStory();
    }
});

// Display the collaborative story
function displayStory() {
    playerFormDiv.classList.add("hidden");
    shareDiv.classList.add("hidden");
    storyContainer.classList.remove("hidden");

    let storyText = "این داستان گروهی شماست:\n\n";

    playersData.forEach((p, idx) => {
        storyText += `${idx+1}. یک روز ${p.name} با حالتی ${p.emotion} تصمیم گرفت به ${p.place} برود و ${p.food} بخرد. ناگهان یک ${p.animal} با سرعت ${p.action} کرد و ${p.sillyObject} را برداشت! ${p.name} جیغ کشید: "${p.sound}!" و ${p.friend} با خنده دوید دنبال آن. همه با هم گفتند: "${p.exclamation}" 😂\n\n`;
    });

    storyEl.textContent = storyText.trim();
}

// Restart the game
restartBtn.addEventListener("click", function() {
    numPlayers = 0;
    currentPlayer = 1;
    playersData = [];
    madlibForm.reset();
    setupDiv.classList.remove("hidden");
    playerFormDiv.classList.add("hidden");
    shareDiv.classList.add("hidden");
    storyContainer.classList.add("hidden");
});
