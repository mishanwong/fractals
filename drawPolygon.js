const canvas = document.getElementById("fractal");
const ctx = canvas.getContext("2d");

const corridor = document.getElementById("infiniteCorridor");
const triangle = document.getElementById("sierpinskiTriangle");
const tree = document.getElementById("binaryTree");
const fern = document.getElementById("barnsleyFern");

const header = document.getElementById("header");
const levelDisplay = document.getElementById("level");
const addLevelButton = document.getElementById("addLevel");
const removeLevelButton = document.getElementById("removeLevel");
const angleDisplay = document.getElementById("angle");

const sliderContainer = document.getElementById("sliderContainer");
const slider = document.getElementById("slider");
const fernControlContainer = document.getElementById("fernControlContainer");
const levelsControlDiv = document.getElementById("levelsControlContainer");

const playButton = document.getElementById("playButton");

let level = 0;
let selected = "";
let angle = 60;

const maxLevel = {
  infiniteCorridor: 30,
  sierpinskiTriangle: 10,
  binaryTree: 15,
};

corridor.addEventListener("click", () => {
  header.innerText = "Infinite Corridor";
  selected = "infiniteCorridor";
  reset();
  displayControlsDiv();
  ctx.strokeStyle = getRandomColor();
});

triangle.addEventListener("click", () => {
  header.innerText = "Sierpinski Triangle";
  selected = "sierpinskiTriangle";
  reset();
  displayControlsDiv();
  ctx.strokeStyle = getRandomColor();
});

tree.addEventListener("click", () => {
  header.innerText = "Binary Tree";
  selected = "binaryTree";
  reset();
  displayControlsDiv();
  ctx.strokeStyle = getRandomColor();
});

fern.addEventListener("click", () => {
  header.innerText = "Barnsley Fern";
  selected = "barnsleyFern";
  displayControlsDiv();
  reset();
});

slider.addEventListener("input", (e) => {
  angleDisplay.textContent = `Angle: ${e.target.value} degrees`;
  angle = e.target.value;
  draw();
});

const displayControlsDiv = () => {
  if (selected === "infiniteCorridor" || selected === "sierpinskiTriangle") {
    showContainer(levelsControlDiv);
    levelDisplay.innerText = level;
    hideContainer(sliderContainer);
    hideContainer(fernControlContainer);
  } else if (selected === "binaryTree") {
    showContainer(levelsControlDiv);
    showContainer(sliderContainer);
    hideContainer(fernControlContainer);
  } else if (selected === "barnsleyFern") {
    showContainer(fernControlContainer);
    hideContainer(levelsControlDiv);
    hideContainer(sliderContainer);
  }
};

const hideContainer = (container) => {
  if (container) {
    container.style.display = "none";
  }
};

const showContainer = (container) => {
  if (container) {
    container.style.display = "block";
  }
};

addLevelButton.addEventListener("click", () => {
  level = Math.min(Math.max(level + 1, 0), maxLevel[selected]);
  levelDisplay.innerText = level;
  draw();
});

removeLevelButton.addEventListener("click", () => {
  level = Math.max(level - 1, 0);
  levelDisplay.innerText = level;
  draw();
});

const reset = () => {
  level = 0;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const draw = () => {
  if (selected === "infiniteCorridor") {
    drawInfiniteCorridor(level);
  } else if (selected === "sierpinskiTriangle") {
    drawSierpinskiTriangle(level);
  } else if (selected === "binaryTree") {
    drawBinaryTree(level);
  } else if (selected === "barnsleyFern") {
    drawBarnsleyFern(level);
  }
};

playButton.addEventListener("click", draw);
const drawInfiniteCorridor = (level) => {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  _drawInfiniteCorridor(
    ctx,
    level,
    centerX,
    centerY,
    ctx.canvas.width,
    ctx.canvas.height
  );
};

const _drawInfiniteCorridor = (ctx, level, centerX, centerY, width, height) => {
  if (level === 0) return;
  const scale = 0.9;
  let newWidth = scale * width;
  let newHeight = scale * height;
  ctx.strokeRect(
    centerX - newWidth / 2,
    centerY - newHeight / 2,
    newWidth,
    newHeight
  );
  _drawInfiniteCorridor(ctx, level - 1, centerX, centerY, newWidth, newHeight);
};

const drawSierpinskiTriangle = (level) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  _drawSierpinskiTriangle(
    ctx,
    level,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );
};

const _drawSierpinskiTriangle = (ctx, level, X, Y, width, height) => {
  if (level === 0) return;
  ctx.beginPath();
  ctx.moveTo(X + width / 2, Y);
  ctx.lineTo(X + width, Y + height);
  ctx.lineTo(X, Y + height);
  ctx.lineTo(X + width / 2, Y);
  ctx.stroke();

  const newX1 = X + width / 4;
  const newY1 = Y;
  const newX2 = X;
  const newY2 = Y + height / 2;
  const newX3 = X + width / 2;
  const newY3 = Y + height / 2;
  const newWidth = width / 2;
  const newHeight = height / 2;
  _drawSierpinskiTriangle(ctx, level - 1, newX1, newY1, newWidth, newHeight);
  _drawSierpinskiTriangle(ctx, level - 1, newX2, newY2, newWidth, newHeight);
  _drawSierpinskiTriangle(ctx, level - 1, newX3, newY3, newWidth, newHeight);
};

const drawBinaryTree = (level) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  _drawBinaryTree(
    ctx,
    level,
    ctx.canvas.width / 2,
    ctx.canvas.height,
    ctx.canvas.width / 2,
    ctx.canvas.height - ctx.canvas.height * 0.25
  );
};

const _drawBinaryTree = (ctx, level, startX, startY, endX, endY) => {
  if (level === 0) return;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  const R = 1 / Math.sqrt(2);
  // const R = 2 / (1 + Math.sqrt(5));

  const theta = (Math.PI * angle) / 180;
  const newStartX = endX;
  const newStartY = endY;

  // Create a vector [a,b]
  const a = endX - startX;
  const b = endY - startY;

  // Draw right branch
  const rightEndX = newStartX + R * (a * Math.cos(theta) - b * Math.sin(theta));
  const rightEndY = newStartY + R * (a * Math.sin(theta) + b * Math.cos(theta));
  _drawBinaryTree(ctx, level - 1, newStartX, newStartY, rightEndX, rightEndY);

  // Draw left branch
  const leftEndX = newStartX + R * (a * Math.cos(theta) + b * Math.sin(theta));
  const leftEndY = newStartY + R * (-a * Math.sin(theta) + b * Math.cos(theta));
  _drawBinaryTree(ctx, level - 1, newStartX, newStartY, leftEndX, leftEndY);
};

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const drawBarnsleyFern = async (level) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "rgb(0 128 0)";
  let x0 = 0;
  let y0 = 0;
  for (let i = 0; i < 100000; i++) {
    ctx.beginPath();
    ctx.arc(
      x0 * 100 + ctx.canvas.width / 2,
      ctx.canvas.height - y0 * 75,
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();

    const rand = Math.random();
    let x1, y1;
    if (rand <= 0.01) {
      x1 = 0;
      y1 = 0.16 * y0;
    } else if (rand <= 0.86) {
      x1 = 0.85 * x0 + 0.04 * y0;
      y1 = -0.04 * x0 + 0.85 * y0 + 1.6;
    } else if (rand <= 0.93) {
      x1 = 0.2 * x0 - 0.26 * y0;
      y1 = 0.23 * x0 + 0.22 * y0 + 1.6;
    } else {
      x1 = -0.15 * x0 + 0.28 * y0;
      y1 = 0.26 * x0 + 0.24 * y0 + 0.44;
    }
    x0 = x1;
    y0 = y1;

    if (i % 100 === 0) {
      await sleep(0.0001);
    }
  }
};
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r} ${g} ${b})`;
};
