const btn = document.getElementById("btnstart");

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const getborad = () => {
    return  gameboard ;
  };
  const setborad = () => {
      gameboard=["", "", "", "", "", "", "", "", ""];
  };
  const render = () => {
     count =0;
     Gameboard.setborad();
    let inner = "";
    for (let index = 0; index < 9; index++) {
      inner += `<button class="sq" id="${index}"></button>`;
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
    setborad
  };
})();

const createplayer = (name, mark) => {
  return {
    name,
    mark,
    played: [],
  };
};

const Game = (() => {
 
  let count =0;
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
         players[0].played=[];
         players[1].played=[];
         count=0;
         Gameboard.render();

         
      }
     
      
      
      
   })
   }
  );

  let turn = true;
  

  const start = () => {
    document.getElementById("mesg").firstElementChild.textContent= "";
    players = [
      createplayer(document.querySelector("#p1").value, "X"),
      createplayer(document.querySelector("#p2").value, "O"),
    ];
    
    count=0;
    Gameboard.render();
    
  };
  // This function handle click for each cell and store the postion of mark on the board
  const hclick = (e) => {
    console.log(count);
     
    let index = parseInt(e.target.id);
   if (e.target.textContent=="") {
    
    if (turn) {
      e.target.innerHTML = players[0].mark;
      Gameboard.getborad()[index]=players[0].mark;
      console.log(Gameboard.getborad());
      e.target.disabled=true;
      
      let p1= players[0].played.push(index);
      checkwin(players[0]);
      ++count;
      turn = false;
    } 
    else {
      
      e.target.innerHTML = players[1].mark;
      Gameboard.getborad()[index]=players[1].mark;
      console.log(Gameboard.getborad());
      e.target.disabled=true;
      ++count;
      
      let p1= players[1].played.push(index);
      checkwin(players[1]);
      
      
      turn = true;
    }
    if (count==9)

    { 
     document.getElementById("mesg").firstElementChild.textContent= "TIE";
     count=0;
     players[0].played=[];
     players[1].played=[];
     Gameboard.render();
    }  
  }
  };
 
  return {
    start,
    hclick,
    start
  };
})();

//create board
btn.addEventListener("click", () => {
  Game.start();
});
btnrest.addEventListener("click", () => {
   Game.start();
 });
