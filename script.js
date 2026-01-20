const realPrompt =
  "a golden retriever wearing sunglasses at the beach cinematic lighting photorealistic";

function submitGuess() {
  const userGuess = document.getElementById("guess").value.toLowerCase();
  const score = calculateScore(userGuess, realPrompt);
  document.getElementById("score").innerText = `Score: ${score}%`;
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
