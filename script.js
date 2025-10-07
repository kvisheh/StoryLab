let numPlayers = 0;
let currentPlayer = 1;
let playersData = [];

const setupDiv = document.getElementById("setup");
const shareDiv = document.getElementById("shareLink");
const gameLinkInput = document.getElementById("gameLink");
const playerFormDiv = document.getElementById("playerForm");
const playerNumSpan = document.getElementById("playerNum");
const madlibForm = document.getElementById("madlib-form");
const storyContainer = document.getElementById("storyContainer");
const storyEl = document.getElementById("story");
const restartBtn = document.getElementById("restart");

document.getElementById("startGame").addEventListener("click", () => {
    numPlayers = parseInt(document.getElementById("numPlayers").value);
    if (isNaN(numPlayers) || numPlayers < 2) {
        alert("لطفاً یک عدد معتبر وارد کنید (حداقل 2 نفر).");
        return;
    }

    // Generate a fake game link for sharing
    const gameID = Math.random().toString(36).substring(2, 8);
    gameLinkInput.value = `${window.location.href}?game=${gameID}`;

    setupDiv.classList.add("hidden");
    shareDiv.classList.remove("hidden");
    playerFormDiv.classList.remove("hidden");
    playerNumSpan.textContent = currentPlayer;
});

madlibForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
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

    playersData.push(data);

    if (currentPlayer < numPlayers) {
        currentPlayer++;
        playerNumSpan.textContent = currentPlayer;
        madlibForm.reset();
    } else {
        showStory();
    }
});

function showStory() {
    playerFormDiv.classList.add("hidden");
    shareDiv.classList.add("hidden");
    storyContainer.classList.remove("hidden");

    let storyText = "این داستان گروهی شماست:\n\n";

    playersData.forEach((p, index) => {
        storyText += `${index+1}. ${p.name} تصمیم گرفت به ${p.place} برود و ${p.food} بخرد. ناگهان یک ${p.animal} ${p.action} کرد و ${p.sillyObject} را برداشت! ${p.name} با حالت ${p.emotion} گفت: "${p.sound}!" و ${p.friend} به کمک آمد. همه با هم گفتند: "${p.exclamation}"\n\n`;
    });

    storyEl.textContent = storyText;
}

restartBtn.addEventListener("click", () => {
    numPlayers = 0;
    currentPlayer = 1;
    playersData = [];
    madlibForm.reset();
    setupDiv.classList.remove("hidden");
    storyContainer.classList.add("hidden");
    shareDiv.classList.add("hidden");
});
