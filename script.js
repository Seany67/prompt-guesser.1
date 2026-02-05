const rounds = [
  {
    image: "image1.jpg.png",
    prompt: "a golden retriever wearing sunglasses at the beach cinematic lighting photorealistic",
    hint: "Includes a sunny location and a stylish animal."
  },
  {
    image: "image1.jpg.png",
    prompt: "a dreamy watercolor landscape with rolling hills soft pastel colors and gentle fog",
    hint: "Think paint, soft tones, and nature."
  },
  {
    image: "image1.jpg.png",
    prompt: "a futuristic city skyline at dusk with glowing neon signs and flying cars",
    hint: "It blends sci-fi tech with city vibes."
  }
];

const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const roundEl = document.getElementById("round");
const bestScoreEl = document.getElementById("bestScore");
const imageEl = document.getElementById("gameImage");
const guessEl = document.getElementById("guess");
const revealEl = document.getElementById("reveal");
const historyEl = document.getElementById("history");
const submitBtn = document.getElementById("submit");
const hintBtn = document.getElementById("hint");
const skipBtn = document.getElementById("skip");

let currentRound = 0;
let bestScore = 0;
let hintUsed = false;

const stopWords = new Set([
  "a",
  "an",
  "the",
  "with",
  "and",
  "at",
  "in",
  "of",
  "to",
  "for",
  "on",
  "into",
  "over",
  "under",
  "from",
  "by",
  "is"
]);

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word && !stopWords.has(word));

const buildScore = (guess, prompt) => {
  if (!guess.length) return { score: 0, matches: [] };

  const promptWords = Array.from(new Set(prompt));
  const guessWords = Array.from(new Set(guess));

  const matches = guessWords.filter((word) => promptWords.includes(word));
  const rawScore = Math.floor((matches.length / promptWords.length) * 100);

  return { score: Math.min(100, rawScore), matches };
};

const renderRound = () => {
  const roundNumber = currentRound + 1;
  roundEl.textContent = `${roundNumber} / ${rounds.length}`;
  imageEl.src = rounds[currentRound].image;
  imageEl.alt = "AI generated scene";
  guessEl.value = "";
  revealEl.textContent = "";
  scoreEl.textContent = "Score: 0%";
  messageEl.textContent = "Start by typing your best prompt guess.";
  hintUsed = false;
  hintBtn.disabled = false;
};

const addHistoryItem = (guess, score, matches) => {
  const item = document.createElement("li");
  const matchText = matches.length ? matches.join(", ") : "No keyword matches";
  item.innerHTML = `
    <span class="history-score">${score}%</span>
    <div>
      <p class="history-guess">${guess}</p>
      <p class="history-matches">Matches: ${matchText}</p>
    </div>
  `;
  historyEl.prepend(item);
};

const submitGuess = () => {
  const userGuess = guessEl.value.trim();
  if (!userGuess) {
    messageEl.textContent = "Please enter a guess before submitting.";
    return;
  }

  const promptWords = normalize(rounds[currentRound].prompt);
  const guessWords = normalize(userGuess);
  const { score, matches } = buildScore(guessWords, promptWords);

  scoreEl.textContent = `Score: ${score}%`;
  bestScore = Math.max(bestScore, score);
  bestScoreEl.textContent = `${bestScore}%`;

  messageEl.textContent = score > 70
    ? "Great guess! You're matching the vibe."
    : score > 40
    ? "Nice! You're catching some keywords."
    : "Keep refining the style, subject, and mood.";

  revealEl.textContent = `Original prompt: "${rounds[currentRound].prompt}"`;
  addHistoryItem(userGuess, score, matches);

  hintBtn.disabled = true;
};

const revealHint = () => {
  if (hintUsed) return;
  hintUsed = true;
  messageEl.textContent = rounds[currentRound].hint;
  hintBtn.disabled = true;
};

const nextRound = () => {
  currentRound = (currentRound + 1) % rounds.length;
  renderRound();
};

submitBtn.addEventListener("click", submitGuess);

hintBtn.addEventListener("click", revealHint);

skipBtn.addEventListener("click", nextRound);

guessEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submitGuess();
  }
});

renderRound();
