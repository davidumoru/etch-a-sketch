const container = document.querySelector("#container");

const changeColor = (element) => {
  element.style.backgroundColor = "black";
};

for (let x = 0; x < 16; x++) {
  for (let j = 0; j < 16; j++) {
    const grid = document.createElement("div");
    grid.className = "grid-item";
    grid.addEventListener("mouseover", () => changeColor(grid));
    container.appendChild(grid);
  }
}

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  const grids = document.querySelectorAll(".grid-item");
  grids.forEach((grid) => {
    grid.style.backgroundColor = "aliceblue";
  });
});
