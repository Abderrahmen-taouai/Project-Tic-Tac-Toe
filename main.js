const btn = document.getElementById("btnstart");

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const getborad = () => {
    return { gameboard };
  };

  const render = () => {
    let inner = "";
    for (let index = 0; index < 9; index++) {
      inner += `<div class="sq" id="${index}">${index}</div>`;
    }
    document.querySelector(".board").innerHTML = inner;

    const squares = document.querySelectorAll(".sq");
    squares.forEach((s) => {
      s.addEventListener("click", Game.hclick);
    });
  };

  return {
    render,
    getborad,
  };
})();

const createplayer = (name, mark) => {
  return {
    name,
    mark,
    played: [],
    score: 0,
  };
};

const Game = (() => {
  let players = [];
  const wincond=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [2,4,6],
   [0,4,8]
  ];
  const checkwin=((p)=>{
   wincond.some(combo=>{
      if(combo.every(index=>p.played.includes(index) )){
         document.getElementById("mesg").firstElementChild.textContent=`YOU win ${p.name}`;
      }
      
   })
  });

  let turn = true;

  const start = () => {
    players = [
      createplayer(document.querySelector("#p1").value, "X"),
      createplayer(document.querySelector("#p2").value, "O"),
    ];

    
    Gameboard.render();
  };
  // This function handle click for each cell and store the postion of mark on the board
  const hclick = (e) => {
    let index = parseInt(e.target.id);
   
    
    if (turn) {
      e.target.innerHTML = players[0].mark;
      let p1= players[0].played.push(index);
      checkwin(players[0]);
      
      turn = false;
    } 
    else {
      
      e.target.innerHTML = players[1].mark;
      let p1= players[1].played.push(index);
      checkwin(players[1]);
      
      
      turn = true;
    }
   
  };
  return {
    start,
    hclick,
  };
})();

//create board
btn.addEventListener("click", () => {
  Game.start();
});
btnrest.addEventListener("click", () => {
   Game.start();
 });
