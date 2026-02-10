const gridElement = document.getElementById("grid");
const wordListElement = document.getElementById("word-list");
let foundWords = new Set();


let isSelecting = false;
let selectedCells = [];

function renderGrid() {
  gridElement.innerHTML = "";

  grid.forEach((row, r) => {
    row.forEach((letter, c) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = letter;
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener("mousedown", () => startSelection(cell));
      cell.addEventListener("mouseenter", () => dragSelection(cell));

      gridElement.appendChild(cell);
    });
  });
}

function startSelection(cell) {
  clearSelection();
  isSelecting = true;
  selectCell(cell);
}

function dragSelection(cell) {
  if (!isSelecting) return;
  selectCell(cell);
}

function selectCell(cell) {
  if (selectedCells.includes(cell)) return;
  cell.classList.add("selected");
  selectedCells.push(cell);
}

function clearSelection() {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
}

document.addEventListener("mouseup", () => {
  if (isSelecting) {
    checkWord();
  }
  isSelecting = false;
});

function checkWord() {
  const selectedText = selectedCells.map(c => c.textContent).join("");

  if (wordPositions[selectedText] && !foundWords.has(selectedText)) {
    foundWords.add(selectedText);

    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("found");
    });

    renderWordList();
  } else {
    clearSelection();
  }
}

function renderWordList() {
  wordListElement.innerHTML = "";
  Object.keys(wordPositions).forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;

    if (foundWords.has(word)) {
      li.style.textDecoration = "line-through";
      li.style.color = "green";
    }

    wordListElement.appendChild(li);
  });
}

renderGrid();
renderWordList();