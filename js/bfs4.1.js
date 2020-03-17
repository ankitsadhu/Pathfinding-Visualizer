var NIL = -1;
var infinity = 9999;
var cols =57;
var rows = 22;
var grid = new Array(rows);
var adj = new Array(rows * cols);
var w;
var h;
//BFS
var initial = 1;
var waiting = 2;
var visited = 3;
var n = rows * cols; // no of vertices
var states = new Array(n);
var queue_arr = new Array(n);
var stack_arr = new Array(n );
var predecessor = new Array(n);
var distance = new Array(n);
var path = new Array(n);
var wall_arr = new Array(n);
var front = -1;
var rear = -1;
var top_aa = -1;
var starting_vertex = 0;
var destination_vertex = 1253;
var Choise = 2;
var speed = 50;
var wall =99;
var BFS_occcur = 0;
var DFS_occur = 0;
let img_start_point;
let img_end_point;
let img_path_start;
let img_path_end;


function preload() {
	img_start_point = loadImage("images/start.png");
	img_path_start = loadImage("images/path_start.jpg");
	img_end_point = loadImage("images/target.png");  
	img_path_end = loadImage("images/path_end.jpg");  
}

function setup(){
	createCanvas(windowWidth*0.98,windowHeight*0.7);
	w = width / cols;
	h = height / rows;

	
}

	generate();
	adjacent_matrix();

	

	document.querySelector(".slow").addEventListener("click",function(){
    speed= 500;
  	});

	document.querySelector(".fast").addEventListener("click",function(){
    speed = 25;
  	});


	document.querySelector(".BFS-btn").addEventListener("click",function(){
    	document.querySelector(".btn").innerHTML = "Visualize BFS!";
		Choise = 0;
  	});

	document.querySelector(".DFS-btn").addEventListener("click",function(){
		document.querySelector(".btn").innerHTML = "Visualize DFS!";
	    Choise = 1;
  	});

	document.querySelector(".Clear-Board").addEventListener("click",function(){
	  for(let i=0;i<n;i++){
		  states[i]=0;
	  }
		adjacent_matrix();
	});

	document.querySelector(".Clear-Wall").addEventListener("click",function(){
		for(let i=0;i<n;i++){
			if(states[i]== 99){
				states[i] = 0;
			}
		}
		 
	  });

	document.querySelector(".Clear-Path").addEventListener("click",function(){
		for(let i=0;i<n;i++){
			if(states[i]== 7){
				states[i] = 3;
			}
		}
		 
	  });

	document.querySelector(".btn").addEventListener("click",function(){
  	
		switch(Choise) {
		    case 0:
		    console.log("BFS");
		    document.querySelector(".Change-txt").innerHTML ="<p>Breath-First Search is <b>unweighted</b> and <b>gaurantee</b> the shortest path! </p>";
		    BFS_traversal();
		    break;
		    
		    case 1:
		    console.log("DFS");
		    document.querySelector(".Change-txt").innerHTML ="<p>Dreath-First Search is <b>unweighted</b> and does not <b>gaurantee</b> the shortest path! </p>";
		    DFS_traversal();
		    break;

		  	default:
		  	
		  	document.querySelector(".btn").innerHTML = "Pick an Algorithm!";
		  	break;
		}

	});
		


function draw(){
	
	background(255);
	let k =0;
	for(let i =0;i<rows;i++){	
	  for(let j=0;j<cols;j++){
		var flag = grid[i][j]
		strokeWeight(0.5);
		
		if(flag == starting_vertex){ 
			if(states[k]!= 7){
			image(img_start_point, j*w,i*h, w, h);
			}else{
			 image(img_path_start, j*w,i*h, w, h);
			}
	 }


	 else if(flag == destination_vertex){ 
		 if(states[k]!= 7){ 
			 image(img_end_point, j*w,i*h, w, h);
		 }else{
			 image(img_path_end, j*w,i*h, w, h);
			}
	 }

		else if(states[k] == 2){	//in the queue color:greenish blue
			fill('#4de8f4'); 
			rect(j*w,i*h, w, h,7,7,7,7);
		}

		else if(states[k] == 3){ //after being processed from queue color:blue
			stroke('255');
			fill('#64c5ff');
			rect(j*w,i*h, w, h);
		}

		

		else if( states[k] == 7){   //shortest path color:yellow
			
			fill(255, 254, 106);
			stroke(255, 254, 106);
			rect(j*w,i*h, w, h);
		}

		else if( states[k] == 99){ //wall  color: black
			
			fill('black');
			stroke('black');
			rect(j*w,i*h, w, h);
		}

		else{
		stroke(175, 216, 255); // only grid white & blue strokes
		fill('255');
		rect(j*w,i*h, w, h);
		}

		//noStroke();
    	//textAlign(CENTER);
    	//text(grid[i][j], j * w + w/2, i * h +h/2);
    	k++;
	   }

	  }

	
 }


  function generate(){     //Making 2D array
 	
 	let counter =0;
 		for (let i = 0; i < grid.length; i++) { 
    		grid[i] = new Array(cols); 
      		for (let j = 0; j < cols; j++) { 
        	grid[i][j] = counter;
        	counter++; 

			}
		}
}	

 function adjacent_matrix() {

 	
 	let origin = 0;
 		for(let i = 0;i < adj.length; i++){
 		  adj[i] = new Array(rows * cols).fill(0);
 	}	

 	for(let i = 0; i < rows; i++){
 		for(let j = 0; j <cols; j++){

		arrange(i,j,origin);
		origin++;
 		}
 	}
 

 }


//BFS
function insert_queue(vertex){
	
	if(rear == n-1){
		console.log("Queue Overflow");
	}
	else{

		if(front == -1){
			front = 0;
		}
		rear = rear + 1;
		queue_arr[rear] = vertex;
	}

}

function isEmpty_queue() {
	if(front == -1 || front > rear){
		return 1;
	}
	else{
		return 0;
	}
}


function delete_queue() {
	
	var del_item;
	if(front == -1 || front> rear){
		console.log("Queue Underflow");
	}
	else{
		del_item = queue_arr[front];
		front = front + 1;
		return del_item;
	}
}


 function BFS_traversal() {
 	let v;
 	for(v=0;v<n;v++){
 		states[v] = initial;
 		predecessor[v]=NIL;
 		distance[v]= infinity;
 	}
 	 
 	BFS(starting_vertex);
 }



 async function BFS(v) {
    
 	insert_queue(v);
 	states[v] = waiting;
 	distance[v] = 0;
 	predecessor[v]= NIL;
 	while(!isEmpty_queue())
 	{
 		v = delete_queue();
 		states[v] = visited;
 		await sleep(speed);
 		for(let i=0; i<n;i++){
 			if(adj[v][i]==1&&states[i]==initial){
 				insert_queue(i);
 				states[i] =waiting;
 				predecessor[i] = v;
 				console.log("i&v" +i +v);
 				distance[i] = distance[v]+1;
 			}
 		}
 	}
 	shortest_path();
 	
}
//DFS
function push_stack(vertex){
	
	if(top_aa == n){
		//console.log("Stack Overflow");
		//console.log("top_aa = " +top_aa);

		return;
	}
	else{
	top_aa = top_aa + 1;
	stack_arr[top_aa] = vertex;
}
}

function isEmpty_stack() {
	if(top_aa == -1 ){
		return 1;
	}
	else{
		return 0;
	}
}


function pop_stack() {
	
	var v;
	if(top_aa == -1){
		console.log("Stack Underflow");
	}
	else{
		v = stack_arr[top_aa];
		top_aa = top_aa - 1;
		return v;
	}
}


function DFS_traversal() {
	let v;
 	for(v=0;v<n;v++){
 		states[v] = initial;
 		predecessor[v]=NIL;
 		//distance[v]= infinity;
 	}
 	 

 	DFS(starting_vertex);
 }


 async function DFS(v) {
    
 	push_stack(v);
 	while(!isEmpty_stack())
 	{
 		await sleep(speed);
 		v = pop_stack();
 		states[v] = visited;
 		console.log("poped stack = " +v);
 		if(states[v]==initial){
 			states[v] =visited;
 		}
 		
 		for(let i=n-1; i>=0;i--){
 			if(adj[v][i]==1&&states[i]==initial){
 				push_stack(i);
 				states[i] = waiting;
 				predecessor[i] = v;
 				console.log("predecessor =" +v);
 				distance[i] = distance[v]+1;
 			}
 		}
 	}
 	shortest_path();
 	
}



async function shortest_path(){
	var u;
	var shortPath;
	
	let v;
	
	v = destination_vertex;
 while(1){

		if(v==-1){
			break;
		}var count =0;

		while(v!=NIL){
				count++;
				path[count] = v;
				u = predecessor[v];
				v = u;

			}
		console.log("DONE!");
		
		for(let i=count; i>1;i--){
			await sleep(speed);
		shortPath = path[i];
		states[shortPath] = 7;               //-> 7 shortest 
		console.log("shortest path " + path[i]);
	 	}
		 states[destination_vertex] = 7; 
		 
		 if(Choise == 0){
		 BFS_occcur++;
		 queue_reset();
		 console.log("BFS shortes_path");
		}

		else if(Choise == 1){
			DFS_occur++;
			
			console.log("DFS shortes path");
			dfs_reset();
		}

	}
}

function dfs_reset(){
	if(DFS_occur>0){
		top_aa=-1;
	}
}

function queue_reset(){
	
	if(BFS_occcur>0){
		front = -1;
		rear = -1;

	}
}

//create Wall
function mousePressed() {

	if(mouseY>=0&&mouseY<=height && mouseX>=0&&mouseX<=width){
	let x = floor(mouseX / w);
	let y = floor(mouseY / h);
	var flag = grid[y][x] ;
		
		if(flag == starting_vertex || flag == destination_vertex){    //Cannot create wall at staring/ending node
		}

		else {

			if(wall_arr[flag]==grid[y][x]){ // if press & there is already a wall make it back to normal
				
				arrange(y,x,flag);
				states[flag]=1;
				wall_arr[flag]=0;
			}


			else{
			let origin =0;
			let destination = grid[y][x];
		 	
			wall_arr[flag] = grid[y][x] ;
			states[flag] = wall;

			for(let z=0; z<=n;z++){
				
				adj[origin][destination] = 0;
				adj[destination][origin] = 0;
				}
			  }
	    }
	 }

}


//delay function
async function sleep(ms){
	
	return new Promise(resolve => setTimeout(resolve,ms));
}




function arrange(i,j,origin){
	let destination;
		if(i==0&&j==0){ 	//corner case top left
		destination = grid[i][j+1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i+1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i+1][j+1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
		}

	else if(i == 0&&j>0&&j<cols-1){  
		destination = grid[i][j-1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j+1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i+1][j-1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i+1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i+1][j+1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
		}

	else if(i ==0 && j == cols-1){		//corner case top right
		destination = grid[i][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
		

		destination = grid[i + 1][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
		}


	else if(j == 0 && i > 0  && i < rows -1){

		destination = grid[i - 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
	}

	else if( i == rows - 1 && j == 0){	//corner case bottom left

		destination = grid[i - 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
	}

	else if(i == rows - 1 && j>0 && j<cols -1){

		destination = grid[i][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
	}

	else if(i == rows -1 && j == cols -1){ // corner case bottom right

		destination = grid[i][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j -1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
	}

	else if( j == cols -1 && i>0 && i< rows - 1){

		destination = grid[i -1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j -1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j -1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
	}

	else{

		destination = grid[i -1][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i - 1][j +1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j - 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;

		destination = grid[i + 1][j + 1];
		adj[origin][destination] = 1;
		adj[destination][origin] = 1;
	}
}

