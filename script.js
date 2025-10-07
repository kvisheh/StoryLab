document.addEventListener("DOMContentLoaded", function () {
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
    startBtn.addEventListener("click", function () {
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
    madlibForm.addEventListener("submit", function (e) {
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
            generateCollaborativeStory();
        }
    });

    function generateCollaborativeStory() {
        playerFormDiv.classList.add("hidden");
        shareDiv.classList.add("hidden");
        storyContainer.classList.remove("hidden");

        // Helper to cycle through players
        const getPlayer = (index) => playersData[index % playersData.length];

        // Longer, fully collaborative story
        const story = `
یک روز ${getPlayer(0).name} با حالتی ${getPlayer(1).emotion} تصمیم گرفت به ${getPlayer(2).place} برود و ${getPlayer(0).food} بخرد. 
در مسیر، یک ${getPlayer(1).animal} ظاهر شد که شروع به ${getPlayer(2).action} کردن کرد و ${getPlayer(0).sillyObject} را برداشت! 
${getPlayer(0).name} جیغ کشید: "${getPlayer(1).sound}!" و ${getPlayer(2).friend} با خنده دوید دنبال آن. 

ناگهان ${getPlayer(1).name} تصمیم گرفت کاری عجیب انجام دهد: ${getPlayer(2).action} کردن با ${getPlayer(0).sillyObject} در ${getPlayer(1).place}! 
همه با هم خندیدند و گفتند: "${getPlayer(2).exclamation}" 😂
در پایان، ${getPlayer(0).name} و ${getPlayer(1).friend} با هم ${getPlayer(2).action} کردند و یک روز کاملاً دیوانه‌وار را به پایان رساندند.
        `.trim();

        storyEl.textContent = story;
    }

    // Restart the game
    restartBtn.addEventListener("click", function () {
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
