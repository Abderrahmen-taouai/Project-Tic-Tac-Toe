
const btn= document.getElementById('btnstart');
const gameboard=[];

//create board
 btn.addEventListener('click',()=>{
    let inner="";
 for (let index = 0; index < 8; index++) {
    inner +=`<div class="sq" id="${index}">${index}</div>`;
 }
 document.querySelector(".board").innerHTML =inner;
});
