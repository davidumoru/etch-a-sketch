const container = document.querySelector("#container");

for (let x = 0; x < 16; x++) {
  for (let j = 0; j < 16; j++) {
    const grid = document.createElement("div");
    grid.className = "grid-item";
    container.appendChild(grid);
  }
}
