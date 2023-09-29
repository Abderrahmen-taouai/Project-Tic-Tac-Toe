
const btn = document.getElementById("btnstart");
const board =document.querySelector(".board");
const mes=document.getElementById('mesg');


// Module for Gameboard
const Gameboard = (() => {
  const gameboard = ["", "","", "", "", "", "", "", ""];

  function getborad() {
    return gameboard;
  };

  function adjustboard (i,v)  {
    
      gameboard[i] = v;
    }
  const setborad = () => {
    for (const index in gameboard) {
      gameboard[index] ="";
    }
  };
  const display = () => {
    
    let inner = "";
    for (let index = 0; index < 9; index++) {
      inner += `<div class="sq" id="${index}"></div>`;
    }
    board.innerHTML = inner;

    const squares = document.querySelectorAll(".sq");
    squares.forEach((s) => {
      s.addEventListener("click", Game.play);
    });
  };

  return {
    getborad,
    setborad,
    adjustboard,
    display,
  };
})();


const GameDisplay = (() => {
  p1 = makeplayer(document.getElementById("p1").value, "X");
  p2 = makeplayer(document.getElementById("p2").value, "O");
 

  let currentplayer=p1;
 
 
return {
  p1,
  p2,
  currentplayer,
  
  
}
})();

function makeplayer(name,mark){
  return {
   name,
   mark,
   
  }
 };


const Game=(()=>{
  
  const start=()=>{
      
    mes.textContent=`Player ${GameDisplay.currentplayer.mark}'s turn!`;
    
    Gameboard.setborad();
    Gameboard.display();
    GameDisplay; 
  }
  
  const changeplayer=(p)=>{
    GameDisplay.currentplayer= p==GameDisplay.p1 ? GameDisplay.p2 : GameDisplay.p1;
}

  const play = (e) => {
    
    if (e.target.innerText != "") {
      return;
    }
   
    
    
    let id = parseInt(e.target.id);
    let mark = (GameDisplay.currentplayer.mark);
    e.target.innerText = mark;
    
    console.log(Gameboard.getborad());
    Gameboard.adjustboard(id, mark);
    console.log(id, mark); console.log(typeof(id), typeof(mark));
    
    changeplayer(GameDisplay.currentplayer);
    mes.textContent =`Player ${GameDisplay.currentplayer.mark}'s turn!`;
    console.log(Gameboard.getborad());
    
    checkwin(GameDisplay.currentplayer);
    checkdraw();
  };

  let wincombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
   ];
  
  
  function checkwin(p) {
   
    for (let i=0;i<wincombos.length;i++) {
      const [a, b, c] = wincombos[i];
      console.log("index ",i);
    
      if (
        Gameboard.getborad()[a] &&
        Gameboard.getborad()[a] == Gameboard.getborad()[b] &&
        Gameboard.getborad()[b] == Gameboard.getborad()[c]
      ) 
      {
       

        
        
        alert(`Player ${p.name} is the Winner`);
        
        reset();
        break;
      } 
      
      
     }
    }
  function checkdraw(){
    let j=0;
    for (let index = 0; index < Gameboard.getborad().length; index++) {
      const element = Gameboard.getborad()[index];

       if(Gameboard.getborad()[index]!="")
        { j++};
  } 
      if(j==9) 
      {
      console.log("index for tie",j);
      
     
      alert(`TIEEEEEEEEEEEEEEEEE`);
      
      gamestate = false; 
    reset();}
  }

  const reset=()=>{
    count=0;  
    mes.textContent = "";
    Gameboard.setborad();
    Gameboard.display();
    
   
  }

return {
  start,
  play,
  reset,
}

})();

btn.addEventListener("click",Game.start);