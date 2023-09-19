/* elementi */
const main = document.querySelector('.game-wrapper');
const playBtn = document.querySelector('#play');
const levelSelect = document.querySelector('#level');

/* variabili */
let numCell;
// creo l'array per il num di celle
const level = [100, 81, 49];
// creo il numero di bombe totali
const numRandomBomb = 16;
// creo l'array vuoto
let randomBomb = [];
// creo il counter e lo inizializzo a 0
let counter = 0;

playBtn.addEventListener('click', play);


/* function */
function play(){
  // imposto il valore di numCell uguale al value di levelSelect
  numCell = level[levelSelect.value];

  do{
    // genero un numero random da 1 a numCell
    const random = Math.floor(Math.random() * (numCell - 1) + 1);

    // se il numero non è presente dentro l'array viene inserito dentro
    if(!(randomBomb.includes(random))){
      randomBomb.push(random);

      counter++;
    }

  }while(counter < numRandomBomb);

  console.log(randomBomb);

  reset();

  generatePlayGround();
}

function reset(){
  main.innerHTML = '';
}

function generatePlayGround(){
  const grid = document.createElement('div');

  grid.className = 'grid';

  for(let i = 1; i <= numCell; i++){
    const cell = createCell(i);

    grid.append(cell);
  }

  main.append(grid);
}

function createCell(index){
  const cell = document.createElement('div');

  cell.className = 'cell';
  cell.classList.add('square' + numCell);
  cell._cellId = index;
  
  cell.addEventListener('click', hendleClickCell);

  return cell;
}

function hendleClickCell(){
  // controllo se la cella sia una bomba o no
  if(randomBomb.includes(this._cellId)){
    this.classList.add('bomb');
  }else{
    this.classList.add('clicked');
  }

  // se la cella è stata cliccata tolgo il listener
  this.removeEventListener('click', hendleClickCell);

  counter++

  console.log(this._cellId);
}