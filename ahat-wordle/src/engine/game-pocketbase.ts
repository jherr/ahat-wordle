import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

pb.admins.authWithPassword(
  process.env.POCKET_ADMIN_USER,
  process.env.POCKET_ADMIN_PASSWORD
);

import words from "../words";

export function checkWord(word: string) {
  return words.includes(word.toLowerCase());
}

export async function getGame(gameId: string) {
  return await pb.collection("games").getOne(gameId, {
    expand: "guesses",
    fields: "*",
  });
}

export async function newGame() {
  const record = await pb.collection("games").create({
    word: words[Math.floor(Math.random() * words.length)],
    guesses: [],
    completed: false,
  });
  return record.id;
}

export async function updateGame(gameId: string, guess: string) {
  const game = await getGame(gameId);

  game.guesses.push(guess);
  game.completed =
    game.word.toLowerCase() === guess.toLowerCase() || game.guesses.length >= 6;

  return await pb.collection("games").update(gameId, game);
}
