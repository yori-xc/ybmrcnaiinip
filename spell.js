const targetWord = "NAIINIP";
let guessed = Array(targetWord.length).fill("_");

const wordDisplay = document.getElementById("wordDisplay");
const keyboard = document.getElementById("keyboard");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");

function updateDisplay() {
  wordDisplay.textContent = guessed.join(" ");
}

function handleKey(letter, button) {
  if (!button) return;

  document.querySelectorAll('.key').forEach(btn => btn.classList.remove('clicked'));
  button.classList.add('clicked');

  let found = false;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === letter && guessed[i] === "_") {
      guessed[i] = letter;
      found = true;
    }
  }

  updateDisplay();

  if (!found) {
    alert("Please put the correct answer");
  }
}

const rows = [
  "ABCDEFGHIJ".split(""),
  "KLMNOPQRST".split(""),
  "UVWXYZ".split("").concat(["ENTER"])
];

const rowClasses = ["row1", "row2", "row3"];

// Save button references for keyboard control
const keyMap = {};

rows.forEach((row, i) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = `row ${rowClasses[i]}`;

  row.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "key";
    if (letter === "ENTER") btn.classList.add("enter");

    btn.onclick = () => {
      if (letter !== "ENTER") {
        handleKey(letter, btn);
      } else {
        if (!guessed.includes("_")) {
          document.querySelector(".wrapper-center").style.display = "none";
          videoContainer.style.display = "block";
          video.play();
        } else {
          alert("Please complete the word before pressing ENTER.");
        }
      }
    };

    keyMap[letter] = btn; // map key for physical keyboard use
    rowDiv.appendChild(btn);
  });

  keyboard.appendChild(rowDiv);
});

updateDisplay();

// ✅ Listen for physical keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();

  // If it's A-Z or ENTER
  if ((key >= "A" && key <= "Z") || key === "ENTER") {
    const btn = keyMap[key];
    if (btn) btn.click(); // simulate the button click
  }
});
