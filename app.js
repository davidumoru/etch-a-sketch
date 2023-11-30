const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const setCurrentColor = (newColor) => {
  currentColor = newColor;
};

const setCurrentMode = (newMode) => {
  activateButton(newMode);
  currentMode = newMode;
};

const setCurrentSize = (newSize) => {
  currentSize = newSize;
};

const changeColor = (element) => {
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    element.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    element.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    element.style.backgroundColor = "aliceblue";
  }
};

const container = document.querySelector("#container");
const setupGrid = () => {
  for (let x = 0; x < currentSize; x++) {
    for (let j = 0; j < currentSize; j++) {
      const grid = document.createElement("div");
      grid.className = "grid-item";
      grid.addEventListener("mouseover", () => changeColor(grid));
      container.appendChild(grid);
    }
  }
};

const colorBtn = document.querySelector("#color");
colorBtn.addEventListener("click", () => {
  setCurrentMode("color");
});

const rainbowBtn = document.querySelector("#rainbow");
rainbowBtn.addEventListener("click", () => {
  setCurrentMode("rainbow");
});

const eraserBtn = document.querySelector("#eraser");
eraserBtn.addEventListener("click", () => {
  setCurrentMode("eraser");
});

const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
  const grids = document.querySelectorAll(".grid-item");
  grids.forEach((grid) => {
    grid.style.backgroundColor = "aliceblue";
  });
});

const activateButton = (newMode) => {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
};

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
