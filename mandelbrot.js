const canvas = document.getElementById("mandelbrotFullScreen");
canvas.width = document.body.clientWidth - 20;
canvas.height = window.innerHeight - 20;

const ctx = canvas.getContext("2d");
const width = ctx.canvas.width;
const height = ctx.canvas.height;

const imageData = ctx.createImageData(width, height);

const createImage = () => {
  for (let x = 0; x < Math.floor(width); x++) {
    for (let y = 0; y < Math.floor(height); y++) {
      const pixelIndex = (y * width + x) * 4;
      imageData.data[pixelIndex] = 23;
      imageData.data[pixelIndex + 1] = 72;
      imageData.data[pixelIndex + 2] = 61;
      imageData.data[pixelIndex + 3] = 200;
    }
  }
};

createImage(0);
ctx.putImageData(imageData, 0, 0);
