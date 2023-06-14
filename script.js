const paletteColor = document.querySelectorAll('.color');
paletteColor[0].style.backgroundColor = 'rgb(0,0,0)';
paletteColor[1].style.backgroundColor = 'rgb(255,0,0)';
paletteColor[2].style.backgroundColor = 'rgb(0,0,255)';
paletteColor[3].style.backgroundColor = 'rgb(0,128,0)';

const buttonLimpaCor = document.querySelector('#clear-board');
const buttonCoresAleatoria = document.getElementById('button-random-color');

const salvaPixelStorage = document.querySelector('#pixel-board');

const loadPixels = () => {
  salvaPixelStorage.innerHTML = localStorage.getItem('pixelBoard');
};

const buscandoStoregeSalva = () => {
  if (localStorage.getItem('colorPalette')) {
    const recuperandoValoresSalvos = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 1; index < paletteColor.length; index += 1) {
      paletteColor[index].style.backgroundColor = recuperandoValoresSalvos[index];
    }
  } if (localStorage.getItem('pixelBoard')) {
    loadPixels();
  }
};

buttonCoresAleatoria.addEventListener('click', () => {
  const colorPalette = [];
  for (let index = 0; index < paletteColor.length; index += 1) {
    if (index !== 0) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      paletteColor[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    colorPalette.push(paletteColor[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
});

const removerClass = () => {
  for (let index = 0; index < paletteColor.length; index += 1) {
    paletteColor[index].classList.remove('selected');
  }
};

const selecionaCorPaleta = () => {
  paletteColor[0].classList.add('selected');
  for (let index = 0; index < paletteColor.length; index += 1) {
    paletteColor[index].addEventListener('click', () => {
      removerClass();
      paletteColor[index].classList.add('selected');
    });
  }
};

const selecionaCor = () => {
  let corEscolhida;
  for (let index = 0; index < paletteColor.length; index += 1) {
    if (paletteColor[index].className === 'color selected') {
      corEscolhida = paletteColor[index].style.backgroundColor;
    }
  }
  return corEscolhida;
};
const pintarQuadrado = () => {
  const pintaQuadrado = document.getElementsByClassName('pixel');
  for (let index = 0; index < pintaQuadrado.length; index += 1) {
    pintaQuadrado[index].addEventListener('click', () => {
      pintaQuadrado[index].style.backgroundColor = selecionaCor();
    });
  }
};

const buttonLimpar = () => {
  const limpaCor = document.getElementsByClassName('pixel');
  for (let index = 0; index < limpaCor.length; index += 1) {
    limpaCor[index].style.backgroundColor = 'white';
  }
};

const salvaCoresStorage = () => {
  localStorage.setItem('pixelBoard', salvaPixelStorage.innerHTML);
};

salvaPixelStorage.addEventListener('click', salvaCoresStorage);
buttonLimpaCor.addEventListener('click', buttonLimpar);

window.onload = () => {
  buscandoStoregeSalva();
  selecionaCorPaleta();
  pintarQuadrado();
};
