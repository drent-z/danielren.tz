const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');

const frameCount = 148;
const images = [];
const imageSeq = {
  frame: 0
};

const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
img.onload = function() {
  context.drawImage(img, 0, 0);
};

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(images[index], 0, 0);
};

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
