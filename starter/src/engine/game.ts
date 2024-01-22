import fs from "fs";
import words from "../words";

export function checkWord(word: string) {
  return words.includes(word.toLowerCase());
}

function initGameFile() {
  if (!fs.existsSync("games.json")) {
    fs.writeFileSync("games.json", "{}");
  }
}

export function getGame(gameId: string) {
  initGameFile();

  const games = JSON.parse(fs.readFileSync("games.json", "utf-8"));
  return games[gameId];
}

export function newGame() {
  initGameFile();

  const games = JSON.parse(fs.readFileSync("games.json", "utf-8"));
  const gameId =
    Math.random().toString(36).substring(7) +
    Math.random().toString(36).substring(7);

  games[gameId] = {
    word: words[Math.floor(Math.random() * words.length)],
    guesses: [],
    completed: false,
  };
  fs.writeFileSync("games.json", JSON.stringify(games, null, 2));
  return gameId;
}

export function updateGame(gameId: string, guess: string) {
  initGameFile();

  const games = JSON.parse(fs.readFileSync("games.json", "utf-8"));

  games[gameId].guesses.push(guess);
  games[gameId].completed =
    games[gameId].word.toLowerCase() === guess.toLowerCase() ||
    games[gameId].guesses.length >= 6;

  fs.writeFileSync("games.json", JSON.stringify(games, null, 2));
  return games[gameId];
}
