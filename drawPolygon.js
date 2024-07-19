const canvas = document.getElementById("fractal");
const ctx = canvas.getContext("2d");
const corridor = document.getElementById("infiniteCorridor");

const triangle = document.getElementById("sierpinskiTriangle");
const tree = document.getElementById("binaryTree");
const header = document.getElementById("header");
const levelDisplay = document.getElementById("level");
const addLevelButton = document.getElementById("addLevel");
const removeLevelButton = document.getElementById("removeLevel");
const angleDisplay = document.getElementById("angle");

const sliderContainer = document.getElementById("sliderContainer");
const slider = document.getElementById("slider");

let level = 0;
let selected = "";
let angle = 45;

const maxLevel = {
  infiniteCorridor: 20,
  sierpinskiTriangle: 8,
  binaryTree: 15,
};

corridor.addEventListener("click", () => {
  header.innerText = "Infinite Corridor";
  selected = "infiniteCorridor";
  reset();
  displayLevelsDiv();
  ctx.strokeStyle = getRandomColor();
});

triangle.addEventListener("click", () => {
  header.innerText = "Sierpinski Triangle";
  selected = "sierpinskiTriangle";
  reset();
  displayLevelsDiv();
  ctx.strokeStyle = getRandomColor();
});

tree.addEventListener("click", () => {
  header.innerText = "Binary Tree";
  selected = "binaryTree";
  reset();
  displayLevelsDiv();
  ctx.strokeStyle = getRandomColor();
});

slider.addEventListener("input", (e) => {
  angleDisplay.textContent = `Angle: ${e.target.value} degrees`;
  angle = e.target.value;
  draw();
});

const displayLevelsDiv = () => {
  const levelsDiv = document.getElementById("levels");
  if (!levelsDiv.style.display) {
    levelsDiv.style.display = "block";
  }
  levelDisplay.innerText = level;

  if (selected === "binaryTree") {
    if (
      !sliderContainer.style.display ||
      sliderContainer.style.display === "none"
    ) {
      sliderContainer.style.display = "block";
    }
  } else {
    sliderContainer.style.display = "none";
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
  }
};
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
  // const ctx = canvas.getContext("2d");
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
  // const ctx = canvas.getContext("2d");

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

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r} ${b} ${b})`;
};
