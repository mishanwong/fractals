const mcanvas = document.getElementById("mandelbrot");
mcanvas.width = window.innerWidth * 0.45;
mcanvas.height = (2 / 3) * mcanvas.width;

const mctx = mcanvas.getContext("2d");
const mwidth = mctx.canvas.width;
const mheight = mctx.canvas.height;
const imageData = mctx.createImageData(mwidth, mheight);
const coordinatesDisplay = document.getElementById("coordinatesDisplay");
const MAX_ITERATION = 300;
const MAX_ORBIT = 10 ** 12;

const jcanvas = document.getElementById("julia");
jcanvas.width = window.innerWidth * 0.45;
jcanvas.height = (2 / 3) * jcanvas.width;
const jctx = jcanvas.getContext("2d");
const jwidth = jctx.canvas.width;
const jheight = jctx.canvas.height;
const jImageData = jctx.createImageData(jwidth, jheight);

const createMandelbrotImage = () => {
  // Loop over all the pixels
  for (let px = 0; px < mwidth; px++) {
    for (let py = 0; py < mheight; py++) {
      // Get the coordinates
      const pixelIndex = (py * mwidth + px) * 4;
      const coordinates = pixelToCoordinates(px, py);
      const convergenceVal = converge(coordinates.cx, coordinates.cy);

      if (convergenceVal === MAX_ITERATION) {
        const red = 51;
        const green = 51;
        const blue = 0;
        const alpha = 255;

        // Set the pixel data
        imageData.data[pixelIndex] = red;
        imageData.data[pixelIndex + 1] = green;
        imageData.data[pixelIndex + 2] = blue;
        imageData.data[pixelIndex + 3] = alpha;
      } else {
        let red = 23;
        let green = 72;
        let blue = 255;
        let alpha = 255 - (convergenceVal / 50) * 255;

        // Set the pixel data
        imageData.data[pixelIndex] = red;
        imageData.data[pixelIndex + 1] = green;
        imageData.data[pixelIndex + 2] = blue;
        imageData.data[pixelIndex + 3] = alpha;
      }
    }
  }
};

const createJuliaImage = (a, b) => {
  // / Loop over all the pixels
  for (let px = 0; px < jwidth; px++) {
    for (let py = 0; py < jheight; py++) {
      // Get the coordinates
      const coordinates = pixelToCoordinates(px, py);

      const pixelIndex = (py * jwidth + px) * 4;
      const convergenceVal = juliaConverge(
        coordinates.cx,
        coordinates.cy,
        a,
        b
      );
      if (convergenceVal === MAX_ITERATION) {
        const red = 31;
        const green = 32;
        const blue = 61;
        const alpha = 255;

        // Set the pixel data
        jImageData.data[pixelIndex] = red;
        jImageData.data[pixelIndex + 1] = green;
        jImageData.data[pixelIndex + 2] = blue;
        jImageData.data[pixelIndex + 3] = alpha;
      } else {
        let red = 240 - (convergenceVal / 100) * 100;
        let green = 238 - (convergenceVal / 100) * 100;
        let blue = 225 - (convergenceVal / 100) * 100;
        let alpha = 100;

        // Set the pixel data
        jImageData.data[pixelIndex] = red;
        jImageData.data[pixelIndex + 1] = green;
        jImageData.data[pixelIndex + 2] = blue;
        jImageData.data[pixelIndex + 3] = alpha;
      }
    }
  }
};
const converge = (cx, cy) => {
  let i = 0;
  let x = cx;
  let y = cy;
  while (i < MAX_ITERATION) {
    const newX = x ** 2 - y ** 2 + cx;
    const newY = 2 * x * y + cy;
    if (orbit(newX, newY) > MAX_ORBIT) {
      break;
    }
    x = newX;
    y = newY;
    i++;
  }
  return i;
};
const juliaConverge = (cx, cy, a, b) => {
  let i = 0;
  let x = cx;
  let y = cy;
  while (i < MAX_ITERATION) {
    const newX = x ** 2 - y ** 2 + a;
    const newY = 2 * x * y + b;
    if (orbit(newX, newY) > MAX_ORBIT) {
      break;
    }
    x = newX;
    y = newY;
    i++;
  }
  return i;
};
const orbit = (x, y) => {
  return Math.sqrt(x ** 2 + y ** 2);
};

const pixelToCoordinates = (px, py) => {
  const cx = (px - (mwidth * 2) / 3) / (mwidth / 3);
  const cy = -(py - mheight / 2) / (mheight / 2);

  return { cx: cx, cy: cy };
};

const coordinatesToPixel = (cx, cy) => {
  const px = Math.floor(cx * (mwidth / 3) + (2 * mwidth) / 3);
  const py = Math.floor(cy * (-mwidth / 3) + mwidth / 3);

  return { px: px, py: py };
};

mcanvas.addEventListener("mousemove", (e) => {
  const rect = mcanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  //   coordinatesDisplay.textContent = `${x}, ${y}`;
  const coordinates = pixelToCoordinates(x, y);
  coordinatesDisplay.innerText = `z = ${coordinates.cx.toFixed(
    2
  )} + ${coordinates.cy.toFixed(2)}i`;
  createJuliaImage(coordinates.cx, coordinates.cy);
  jctx.putImageData(jImageData, 0, 0);
});
createMandelbrotImage(0);
mctx.putImageData(imageData, 0, 0);
