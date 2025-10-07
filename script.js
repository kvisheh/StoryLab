document.addEventListener("DOMContentLoaded", function() {
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
    const startBtn = document.getElementById("startGame");

    // Start game
    startBtn.addEventListener("click", function() {
        const inputValue = document.getElementById("numPlayers").value;
        numPlayers = parseInt(inputValue, 10);

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
            generateSharedStory();
        }
    });

    function generateSharedStory() {
        playerFormDiv.classList.add("hidden");
        shareDiv.classList.add("hidden");
        storyContainer.classList.remove("hidden");

        // Shuffle players so each placeholder uses different player input
        const shuffled = playersData.slice().sort(() => 0.5 - Math.random());

        // Build story using different players for different parts
        const story = `
یک روز ${shuffled[0].name} با حالتی ${shuffled[1].emotion} تصمیم گرفت به ${shuffled[2 % shuffled.length].place} برود و ${shuffled[0].food} بخرد. 
ناگهان یک ${shuffled[1].animal} شروع به ${shuffled[2 % shuffled.length].action} کرد و ${shuffled[0].sillyObject} را برداشت! 
${shuffled[0].name} جیغ کشید: "${shuffled[1].sound}!" و ${shuffled[2 % shuffled.length].friend} با خنده دوید دنبال آن. 
همه با هم گفتند: "${shuffled[1].exclamation}" 😂
        `.trim();

        storyEl.textContent = story;
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
});
