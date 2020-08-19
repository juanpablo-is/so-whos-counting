let values = JSON.parse(localStorage.getItem('game')); //Variable save in storage with game data
let check = values.check; //Variable for check if the pc play

//The variables with '..PC' are using only if the pc play
let valuesPC = [[5, 4, 3, 2, 1], [5, 3, 3, 2, 1], [5, 3, 3, 2, 1], [4, 3, 2, 2, 1], [4, 3, 2, 2, 1],
[3, 2, 2, 1, 1], [3, 2, 1, 1, 1], [2, 2, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]];  //Distribution table for PC

let fieldsUser = []; //Cycle variable for the 5 places number
let fieldsPC = []; //Cycle variable for the 5 places number

let totalUser = 0; //Variable save the sum of result in all rounds
let totalPC = 0; //Variable save the sum of result in all rounds
let totalRandom = 0; //Variable save the sum of random numbers

let rankUser = [['0', 99999], ['0', 0]]; //Variable for minimum and maximum
let rankPC = [['0', 99999], ['0', 0]]; //Variable for minimum and maximum

//Check if the pc play for display elements
if (check) {
  document.getElementById('infoPC').style.display = 'block';
  document.getElementById('resultVersus').style.display = 'flex';
  document.getElementById('pnlGamePC').style.display = 'flex';
}

//Principal function
generateValues();

async function generateValues() {
  for (let i = 0; i < values.cycle; i++) {

    //Call function process simulate
    processSimulate();

    //Print value for User
    let generate = `${fieldsUser[0]}${fieldsUser[1]}${fieldsUser[2]}${fieldsUser[3]}${fieldsUser[4]}`;
    totalUser += parseInt(generate);
    let elementGenerate = document.createElement('pre');
    elementGenerate.innerHTML = `#${(i + 1)}   -   ${generate}`;

    //Validate the rank values
    if (parseInt(generate) < rankUser[0][1]) {
      rankUser[0][1] = parseInt(generate);
      rankUser[0][0] = i + 1;
      document.querySelector('#pnlGameUser .result-min').innerHTML = `#${i + 1} - ${parseInt(generate)}`;
    }
    else if (parseInt(generate) > rankUser[1][1]) {
      rankUser[1][1] = parseInt(generate);
      rankUser[1][0] = i + 1;
      document.querySelector('#pnlGameUser .result-max').innerHTML = `#${i + 1} - ${parseInt(generate)}`;
    }

    //Modify the value estimate
    document.querySelector('#pnlGameUser .result-obtenido').innerHTML = totalRandom / ((i + 1) * 5);

    //Modify the value average
    document.querySelector('#pnlGameUser #pnlGameUserPromedio h4').innerHTML = totalUser / (i + 1);

    //Send cycle to list HTML for User
    var user = document.getElementById('user');
    user.prepend(elementGenerate);

    if (check) {
      //Print value for PC
      let generatePC = `${fieldsPC[0]}${fieldsPC[1]}${fieldsPC[2]}${fieldsPC[3]}${fieldsPC[4]}`;
      totalPC += parseInt(generatePC);
      let elementGeneratePC = document.createElement('pre');
      elementGeneratePC.innerHTML = `#${(i + 1)}   -   ${generatePC}`;

      //Validate the rank values
      if (parseInt(generatePC) < rankPC[0][1]) {
        rankPC[0][1] = parseInt(generatePC);
        rankPC[0][0] = i + 1;
        document.querySelector('#pnlGamePC .result-min').innerHTML = `#${i + 1} - ${parseInt(generatePC)}`;
      }
      else if (parseInt(generatePC) > rankPC[1][1]) {
        rankPC[1][1] = parseInt(generatePC);
        rankPC[1][0] = i + 1;
        document.querySelector('#pnlGamePC .result-max').innerHTML = `#${i + 1} - ${parseInt(generatePC)}`;
      }

      //Modify the value estimate
      document.querySelector('#pnlGamePC .result-obtenido').innerHTML = totalRandom / ((i + 1) * 5);

      //Modify the value average
      document.querySelector('#pnlGamePC #pnlGamePCPromedio h4').innerHTML = totalPC / (i + 1);

      //Send cycle to list HTML for PC
      var pc = document.getElementById('pc');
      pc.prepend(elementGeneratePC);

      //Calculate versus User - PC
      if (generate > generatePC)
        document.querySelector('#versusUser h4').innerHTML = parseInt(document.querySelector('#versusUser h4').textContent) + 1;
      else if (generate < generatePC)
        document.querySelector('#versusPC h4').innerHTML = parseInt(document.querySelector('#versusPC h4').textContent) + 1;
      else
        document.querySelector('#versusDraw h4').innerHTML = parseInt(document.querySelector('#versusDraw h4').textContent) + 1;
    }
    await wait(0);
  }

  console.log(totalUser, totalUser / values.cycle)
  // console.log(rankUser, rankPC)
  console.log(totalRandom, totalRandom / (values.cycle * 5))
}

//Logical function with the process game
function processSimulate() {
  //Reset variable for new round
  fieldsUser = ['', '', '', '', ''];
  fieldsPC = ['', '', '', '', ''];

  for (let j = 0; j < 5; j++) {
    let rand = Math.floor(Math.random() * 10);
    totalRandom += rand;

    //Create cycle for User
    let fieldsEmptyUser = [];
    let aux = 0;
    for (let k = 0; k < 5; k++) {
      if (fieldsUser[k] === '')
        fieldsEmptyUser.push(aux);
      aux++;
    }
    fieldsUser[fieldsEmptyUser[values.values[rand][j] - 1]] = rand;

    if (check) {
      //Create cycle for PC
      let fieldsEmptyPC = [];
      aux = 0;
      for (let k = 0; k < 5; k++) {
        if (fieldsPC[k] === '')
          fieldsEmptyPC.push(aux);
        aux++;
      }
      fieldsPC[fieldsEmptyPC[valuesPC[rand][j] - 1]] = rand;
    }
  }
}

//Function promise for timeout
function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}