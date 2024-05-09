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
      document.documentElement.style.setProperty("--grid-size", currentSize);
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

const sizeValue = document.querySelector("#sizeValue");
const sizeSlider = document.querySelector("#sizeSlider");

sizeSlider.addEventListener("input", () => {
  const newSize = parseInt(sizeSlider.value);
  sizeValue.textContent = `${newSize} x ${newSize}`;
  setCurrentSize(newSize);
  resetGrid();
});

const resetGrid = () => {
  container.innerHTML = "";
  setupGrid();
};

const activateButton = (newMode) => {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
    rainbowBtn.style.backgroundColor = "#191918"
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
    colorBtn.style.backgroundColor = "#191918"
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
    eraserBtn.style.backgroundColor = "#191918"
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
    rainbowBtn.style.backgroundColor = "#FCB31B"
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
    colorBtn.style.backgroundColor = "#FCB31B"
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
    eraserBtn.style.backgroundColor = "#FCB31B"
  }
};

const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", () => {
  saveAsImage()
});

const saveAsImage = () => {
  setTimeout(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the canvas size based on the container size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Draw each grid item on the canvas
    const grids = document.querySelectorAll(".grid-item");
    grids.forEach((grid) => {
      const rect = grid.getBoundingClientRect();
      ctx.fillStyle = grid.style.backgroundColor;
      ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "etch-a-sketch.png";
    link.click();
  }, 100); 
};

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
