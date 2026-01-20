const rounds = [
  {
    image: "image1.jpg",
    prompt: "a golden retriever wearing sunglasses at the beach cinematic lighting photorealistic"
  },
  {
    image: "image2.jpg",
    prompt: "a cyberpunk city at night in the rain neon lights futuristic ultra detailed"
  }
];

let currentRound = 0;

function submitGuess() {
  const userGuess = document.getElementById("guess").value.toLowerCase();
  const realPrompt = rounds[currentRound].prompt;
  const score = calculateScore(userGuess, realPrompt);

  document.getElementById("score").innerText = `Score: ${score}%`;

  currentRound = (currentRound + 1) % rounds.length;
  document.getElementById("gameImage").src = rounds[currentRound].image;
  document.getElementById("guess").value = "";
}

function calculateScore(guess, prompt) {
  const guessWords = guess.split(" ");
  const promptWords = prompt.split(" ");

  let matches = 0;
  guessWords.forEach(word => {
    if (promptWords.includes(word)) matches++;
  });

  return Math.min(100, Math.floor((matches / promptWords.length) * 100));
}
