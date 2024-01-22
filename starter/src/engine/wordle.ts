export type LetterState = "correct" | "wrong-place" | "wrong" | "empty";

export function getAvailableLetters(guesses: string[]) {
  let letters = "abcdefghijklmnopqrstuvwxyz".split("");
  for (const guess of guesses) {
    for (const letter of guess.toLowerCase().split("")) {
      letters = letters.filter((l) => l !== letter);
    }
  }
  return letters;
}

export function calculatePositions(word: string, input: string) {
  const correctLetters = word.toLowerCase().split("");
  const inputLetters = input.toLowerCase().split("");

  let remainingCharacters = [...correctLetters];
  return inputLetters.map((letter, index) => {
    let state: LetterState = "wrong";
    if (correctLetters[index] === letter) {
      state = "correct";
      remainingCharacters.splice(remainingCharacters.indexOf(letter), 1);
    } else if (remainingCharacters.includes(letter)) {
      state = "wrong-place";
      remainingCharacters.splice(remainingCharacters.indexOf(letter), 1);
    }
    return {
      letter,
      state,
      index: +index,
    };
  });
}
