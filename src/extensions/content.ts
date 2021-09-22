import styles from './content.css';

const Wrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.className = styles.wrapper;

  function setActive(active: boolean) {
    console.log(active)
    wrapper.style.pointerEvents = active ? 'unset' : 'none';
  }

  return {
    element: wrapper,
    setActive,
  };
};


type ToolsProps = {
  onCursorClick: () => void,
  onColorClick: (color: string) => void,
  onClearClick: () => void,
}
const Tools = ({
  onCursorClick,
  onColorClick,
  onClearClick,
}: ToolsProps) => {
  const toolWrapper = document.createElement('div');
  toolWrapper.className = styles.tools;

  toolWrapper.innerHTML = `
    <div id="tools-cursor" class="${styles.feature}">
      <div class="${styles.button}">
        <svg width="24px" height="24px" viewBox="0 0 320.943 320.943"><path d="M50.147 320.943a9.884 9.884 0 01-4.104-.882 10.031 10.031 0 01-5.926-9.148V10.032c0-4.055 2.439-7.718 6.19-9.265a10.015 10.015 0 0110.93 2.174l220.647 220.647a10.016 10.016 0 012.174 10.93 10.02 10.02 0 01-9.265 6.19H144.222l-87.415 77.699a10.015 10.015 0 01-6.66 2.536zm10.029-286.7v254.34l73.575-65.397a9.994 9.994 0 016.66-2.537h106.171z" /></svg>
      </div>
    </div>
    <div class="${styles.feature}">
      <div class="${styles.button}">
        <svg width="24px" height="24px" viewBox="-15 -15 484.00019 484"><path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"/></svg>
      </div>
      <div id="tools-colors" class="${styles.colorList}">
        <div class="${styles.button}" style="background-color:rgb(0, 0, 0)"></div>
        <div class="${styles.button}" style="background-color:rgb(255,255,255)"></div>
        <div class="${styles.button}" style="background-color:rgb(255,59,48)"></div>
        <div class="${styles.button}" style="background-color:rgb(255,149,0)"></div>
        <div class="${styles.button}" style="background-color:rgb(255,204,0)"></div>
        <div class="${styles.button}" style="background-color:rgb(76,217,100)"></div>
        <div class="${styles.button}" style="background-color:rgb(90,200,250)"></div>
        <div class="${styles.button}" style="background-color:rgb(0,122,255)"></div>
        <div class="${styles.button}" style="background-color:rgb(88,86,214)"></div>
      </div>
    </div>
    <div id="tools-clear" class="${styles.feature}">
      <div class="${styles.button}">
        <svg width="24px" height="24px" viewBox="0 0 299.289 299.289"><path d="M290.422 79.244L220.034 8.857c-11.794-11.795-30.986-11.795-42.78 0L8.867 177.244c-11.822 11.821-11.824 30.957 0 42.78l70.388 70.388c11.821 11.822 30.957 11.824 42.78 0l168.388-168.388c11.821-11.821 11.823-30.958-.001-42.78zm-180.055 199.5c-5.374 5.373-14.071 5.373-19.446 0l-70.388-70.388c-5.373-5.374-5.375-14.071 0-19.446l34.61-34.61 89.834 89.834-34.61 34.61zm168.388-168.387l-122.111 122.11-89.833-89.833 122.11-122.111c5.374-5.374 14.071-5.374 19.446 0l70.388 70.388c5.374 5.374 5.374 14.072 0 19.446z" /></svg>
      </div>
    </div>
  `;


  (toolWrapper.querySelector('#tools-cursor') as HTMLElement).addEventListener('click', handleCursorClick);
  (toolWrapper.querySelector('#tools-colors') as HTMLElement).addEventListener('click', handleColorClick);
  (toolWrapper.querySelector('#tools-clear') as HTMLElement).addEventListener('click', handleClearClick);

  function handleCursorClick() {
    onCursorClick();
  };

  function handleColorClick(e: MouseEvent) {
    const color = (e.target as HTMLElement).style.backgroundColor;
    onColorClick(color);
  }

  function handleClearClick() {
    onClearClick();
  }

  return {
    element: toolWrapper,
  };
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

  function setColor(color: string) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }

  function clear() {
    ctx.clearRect(0, 0, window.innerWidth, window.outerHeight);
  }

  return {
    element: canvas,
    setColor,
    clear,
  };
};

export const injectApp = () => {
  const wrapper = Wrapper();
  const canvas = Canvas();
  const tools = Tools({
    onClearClick: () => {
      canvas.clear();
    },
    onColorClick: (color: string) => {
      wrapper.setActive(true);
      canvas.setColor(color);
    },
    onCursorClick: () => {
      wrapper.setActive(false);
    },
  });

  wrapper.element.append(canvas.element);
  document.body.append(wrapper.element);
  document.body.append(tools.element);
};

