var width=360;
var height=540;
var size=60;
var turns=0;
var countMatrix = [9];
var playercolorMatrix = [9];
var gameover=false;
var canvas=document.getElementById("canvas");
var tune=document.getElementById("tune");
var timer;
var counter=0;
var board=canvas.getContext("2d");
canvas.addEventListener("click", game);
initmatrix();
initall();
function initmatrix(){
	for(var i=0;i<9;i++)
	{
		countMatrix[i]=[6];
		playercolorMatrix[i]=[6];

	}

}
function initall(){
	gameover=false;
	defmatrix();
	drawboard();
	turns=0;
	counter=0;
	timer=setInterval(update, 400);
}
function defmatrix(){
	for(var i=0;i<9;i++){
		for(var j=0;j<6;j++){
			playercolorMatrix[i][j]="";
			countMatrix[i][j]=0;

		}

	}

}
function drawboard(){
	board.clearRect(0, 0, width, height);
	if(turns%2==0)
		board.strokeStyle="red";
	else
		board.strokeStyle="green";
	for(var i=0;i<6;i++){
		for(var j=0;j<9;j++){
			board.strokeRect(i*size,j*size,size,size);
		}}
		for(var i=0;i<9;i++){
			for(var j=0;j<6;j++){
				if(countMatrix[i][j]==0)
					continue;
				if(countMatrix[i][j]==1)
					Circle1(i,j, playercolorMatrix[i][j]);
				else if(countMatrix[i][j]==2)
					Circle2(i,j,playercolorMatrix[i][j]);
				else
					Circle3(i,j,playercolorMatrix[i][j]);

			}

		}
	}
function game(event)
{
	var rect=canvas.getBoundingClientRect();
	var x=event.clientX-rect.left;
	var y=event.clientY-rect.top;
	var row=Math.floor(x/size);
	var column=Math.floor(y/size);
	if(!gameover)
	{
		if(turns%2==0 && (playercolorMatrix[column][row]=="" || playercolorMatrix[column][row]=="red"))
		{
			countMatrix[column][row]++;
			playercolorMatrix[column][row]="red";
			turns++;
		}
    	if(turns%2==1 && (playercolorMatrix[column][row]=="" || playercolorMatrix=="green"))
		{
			countMatrix[column][row]++;
			playercolorMatrix[column][row]="green";
			turns++;
		}
	}
}
function fillCorner(i,j){
	countMatrix[i][j]-=2;
	countMatrix[ i==8 ? i-1 : i+1][j]++;
	countMatrix[i][ j==5 ? j-1 : j+1]++;
	playercolorMatrix[ i==8 ? i-1 : i+1][j]==playercolorMatrix[i][j];
	countMatrix[i][ j==5 ? j-1 : j+1]==playercolorMatrix[i][j];
		if(countMatrix[i][j] == 0)
		colorMatrix[i][j] = "";
	tune.play();
	}

function fillEdgesHeight(i,j){
	countMatrix[i][j]-=3;
	countMatrix[i+1][j]++;
	countMatrix[i-1][j]++;
	countMatrix[i][j==0? j+1 : j-1]++;
	playercolorMatrix[i+1][j]=playercolorMatrix[i][j];
	playercolorMatrix[i-1][j]=playercolorMatrix[i][j];
	playercolorMatrix[i][j==0? j+1 : j-1]=playercolorMatrix[i][j];
	if(countMatrix[i][j]==0)
	{
		playercolorMatrix[i][j]="";
	}
	tune.play();
}
function fillEdgesWidth(i,j){
	countMatrix-=3;
	countMatrix[i][j-1]++;
	countMatrix[i][j+1]++;
	countMatrix[i==0 ? i+1 : i-1][j]++;
	playercolorMatrix[i][j-1]=playercolorMatrix[i][j];
	playercolorMatrix[i][j+1]=playercolorMatrix[i][j];
	playercolorMatrix[i==0 ? i+1 : i-1][j]=playercolorMatrix[i][j];
	if(countMatrix[i][j]==0)
	{
		playercolorMatrix[i][j]="";
	}
     tune.play();}
function update(){
	counter++;
	drawboard();
	while(notSet()){
		if(countMatrix[0][0] >= 2){
			fillCorner[0][0];
		}

		if(countMatrix[8][0] >= 2){
			fillCorner[8][0];
		}

		if(countMatrix[8][5] >= 2){
			fillCorner[8][5];
		}

		if(countMatrix[0][5] >= 2){
			fillCorner[0][5];
		}
		for(var i=1;i<8;i++)
		{
			if(countMatrix[i][0]>=3){
				fillEdgesHeight(i,0);
				break;
			}
		}

		for(var i=1;i<8;i++)
		{
			if(countMatrix[i][5]>=3){
				fillEdgesHeight(i,5);
				break;
			}
		}

		for(var i=1;i<5;i++)
		{
			if(countMatrix[0][i]>=3){
				fillEdgesWidth(0,i);
				break;
			}
		}

		for(var i=1;i<5;i++)
		{
			if(countMatrix[8][i]>=3){
				fillEdgesWidth(8,i);
				break;
			}
		}
		for(var i=1;i<8;i++){
			for(var j=1;j<8;j++){
				if(countMatrix[i][j]>=4){
					countMatrix[i][j]-=4
					countMatrix[i-1][j]++;
					countMatrix[i+1][j]++;
					countMatrix[i][j-1]++;
					countMatrix[i][j+1]++;
					playercolorMatrix[i-1][j]=playercolorMatrix[i][j];
					playercolorMatrix[i+1][j]=playercolorMatrix[i][j];
					playercolorMatrix[i][j-1]=playercolorMatrix[i][j];
					playercolorMatrix[i][j+1]=playercolorMatrix[i][j];
					if(countMatrix[i][j]==0)
						{playercolorMatrix="";}
					tune.play();
					break;
				                        }
			}
		    }
		    break;
}
check();
}
function check(){
	if(pgameover()==1 || pgameover()==2)
	{
		gameover=true;
		drawboard();
		setTimeout(resultScreen.bind(null, pgameover()), 2500);
		clearInterval(timer);
		setTimeout(initall, 7000);

	}
}
function notSet(){
	var nset=false;
	if(countMatrix[0][0]>=2 || countMatrix[0][5]>=2 || countMatrix[8][0]>=2 || countMatrix[8][5]>=2)
		nset=true;
	for(var i=1;i<5;i++)
		{
			if(countMatrix[0][i]>=3){
				nset=true;
			}
		}

		for(var i=1;i<5;i++)
		{
			if(countMatrix[8][i]>=3){
				nset=true;
				}
		}
		for(var i=1;i<8;i++){
			for(var j=1;j<8;j++){
				if(countMatrix[i][j]>=4)
					nset=true;

			}
		}
		return nset;
		}
function pgameover(){
	var P1count=0;
	var P2count=0;
	for(var i=0;i<9;i++)
	{
		for(var j=0;j<6;j++){
			if(playercolorMatrix[i][j]=="p1")
				P1count++;
			if(playercolorMatrix[i][j]=="p2")
				P2count++;

		}

	}
	if(turns>1)
	{
		if(P1count==0)
			return 2;
		if(P2count==0)
			return 1;

	}
}
function resultScreen(player)
{
	if(player==1)
	{
		board.clearRect(0,0,width,height);
		board.fillStyle = "red";
        board.fillRect(0,0,width,height);
		board.fillStyle = "white";
		board.font = "40pt sans";
		board.fillText("Player 1 wins!" , width/2-50,height/2-50);
	}
	else 
		{
		board.clearRect(0,0,width,height);
		board.fillStyle = "green";
        board.fillRect(0,0,width,height);
		board.fillStyle = "white";
		board.font = "40pt sans";
		board.fillText("Player 2 wins!" , width/2-50,height/2-50);
	}

}
