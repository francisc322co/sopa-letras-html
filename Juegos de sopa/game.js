const GRID_SIZE = 10;
const WORDS = ["HTML", "CSS", "JAVA"];

let grid = [];
let wordPositions = {}; // guarda posiciones reales

function randomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function createEmptyGrid() {
  grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => "")
  );
}

function placeWords() {
  WORDS.forEach(word => {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * (GRID_SIZE - word.length));

      // verificar espacio
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== "") {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        wordPositions[word] = [];
        for (let i = 0; i < word.length; i++) {
          grid[row][col + i] = word[i];
          wordPositions[word].push({ row, col: col + i });
        }
        placed = true;
      }
    }
  });
}

function fillRandomLetters() {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = randomLetter();
      }
    }
  }
}

// inicialización
createEmptyGrid();
placeWords();
fillRandomLetters();