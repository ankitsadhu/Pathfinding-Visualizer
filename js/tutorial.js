var Choise =-1;
var modal = document.getElementById('id01');
document.getElementById('id01').style.display='block';


document.querySelector(".prev").addEventListener("click",function(){previous()});

function previous(){
  if(Choise>0){
  Choise--;
 }
 imageSwap();
}

document.querySelector(".next").addEventListener("click",function(){next()});
function next(){
  if(Choise<2){
    Choise++;
  }
  imageSwap();
}
  
function imageSwap(){

  var repImage;
  
  switch(Choise) {
    case 0:
     repImage = "<img src = 'Algo.png'>";
     document.getElementById("tutorial-img").innerHTML = repImage;
     document.querySelector(".para").innerHTML = "<h1><b>Choose an algorithm from the dropdown menu<b></h1>";
     document.querySelector(".page-no").innerHTML = "1/3";
     break;


     case 1:
     repImage = "<img src = 'Selection.png'>";
     document.getElementById("tutorial-img").innerHTML = repImage;
     document.querySelector(".para").innerHTML = "<h1>Click the visualize button to visualize the following algorithm</h1>";
     document.querySelector(".page-no").innerHTML = "2/3";
     break;

     case 2:
     repImage = "<img src = 'Wall.png'>";
     document.getElementById("tutorial-img").innerHTML = repImage;
     document.querySelector(".para").innerHTML = "<h1><b>Adding walls</b></h1><br>Click on the grid to add wall and double click to remove wall<br>";
     document.querySelector(".page-no").innerHTML = "3/3";
     break;
  }
 
}

// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
  //  if (event.target == modal) {
    //    modal.style.display = "none";
    //}
//}