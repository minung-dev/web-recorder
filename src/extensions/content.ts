// TODO: ctx를 다루는 좋은 방법 찾기
let ctx: CanvasRenderingContext2D;

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

const btnStyle = `width: 50px; height: 50px; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); border-radius: 25px; cursor: pointer;`;

const Tools = () => {
  const toolWrapper = document.createElement('div');
  toolWrapper.style.position = 'absolute';
  toolWrapper.style.left = '16px';
  toolWrapper.style.bottom = '16px';

  toolWrapper.innerHTML = `
    <div style="${btnStyle} background-color:rgb(0, 0, 0)"></div>
    <div style="${btnStyle} background-color:rgb(255,255,255)"></div>
    <div style="${btnStyle} background-color:rgb(255,59,48)"></div>
    <div style="${btnStyle} background-color:rgb(255,149,0)"></div>
    <div style="${btnStyle} background-color:rgb(255,204,0)"></div>
    <div style="${btnStyle} background-color:rgb(76,217,100)"></div>
    <div style="${btnStyle} background-color:rgb(90,200,250)"></div>
    <div style="${btnStyle} background-color:rgb(0,122,255)"></div>
    <div style="${btnStyle} background-color:rgb(88,86,214)"></div>
  `;

  toolWrapper.addEventListener('click', handleColorClick);

  function handleColorClick(e: MouseEvent) {
    const color = (e.target as HTMLElement).style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }

  return toolWrapper;
};

const Canvas = () => {
  const INITIAL_COLOR = 'rgb(255,59,48)';

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.outerHeight;

  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
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
  const tools = Tools();

  wrapper.append(canvas);
  wrapper.append(tools);
  document.body.append(wrapper);
};

