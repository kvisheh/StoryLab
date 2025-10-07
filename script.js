const form = document.getElementById("madlib-form");
const storyContainer = document.getElementById("story-container");
const storyEl = document.getElementById("story");
const avatarPreview = document.getElementById("avatar-preview");
const restartBtn = document.getElementById("restart");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const food = document.getElementById("food").value;
  const animal = document.getElementById("animal").value;
  const emotion = document.getElementById("emotion").value;
  const sound = document.getElementById("sound").value;
  const avatar = document.getElementById("avatar").files[0];

  if (!avatar) {
    alert("لطفاً عکس خود را آپلود کنید!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    avatarPreview.src = event.target.result;
  };
  reader.readAsDataURL(avatar);

  const storyText = `
    صبحی ${emotion} بود و ${name} دلش حسابی ${food} می‌خواست.
    ناگهان یک ${animal} از در پرید داخل و گفت "${sound}"!
    ${name} با تعجب گفت: "چی شد؟!" اما ${animal} در حالی که ${food} را برداشته بود، فرار کرد!
    ${name} با ${emotion} زیاد دنبالش دوید تا بالاخره ${food} را پس گرفت.
    نتیجه‌ی اخلاقی: هیچ‌وقت به یک ${animal} گرسنه اعتماد نکن!
  `;

  storyEl.textContent = storyText.trim();

  form.classList.add("hidden");
  storyContainer.classList.remove("hidden");
});

restartBtn.addEventListener("click", () => {
  form.reset();
  form.classList.remove("hidden");
  storyContainer.classList.add("hidden");
});
