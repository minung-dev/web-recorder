const Wrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.width = '100vw';
  wrapper.style.height = '100vh';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.zIndex = '99999999';
  return wrapper;
};

const Canvas = () => {
  const INITIAL_COLOR = 'rgb(255,59,48)';

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.outerHeight;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.strokeStyle = INITIAL_COLOR;
  ctx.fillStyle = INITIAL_COLOR;
  ctx.lineWidth = 2.5;

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);

  let painting = false;

  function stopPainting() {
    painting = false;
  }

  function startPainting() {
    painting = true;
  }

  function onMouseMove(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  return canvas;
};

export const injectApp = () => {
  const wrapper = Wrapper();
  const canvas = Canvas();

  wrapper.append(canvas);
  document.body.append(wrapper);
};

